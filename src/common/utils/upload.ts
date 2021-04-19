import axios from 'axios';  //引入axios
import {host} from 'xx/xx'; //引入域名

const instance = axios.create({
    baseURL: `${host}/xxx`,
});
interface GetTokenParams {
    //获取token的接口
    tokenUrl: string;
    //查询token需要携带的参数
    tokenData?: {
        //文件后缀类型
        suffix?: string;
        [key: string]: any;
    }
    //需要提交到formData的内容
    data?: object;
    //上传的文件，支持base64
    file?: File | Blob | string;
    //提交文件的字段名称，默认'file'
    filed?: string;
    //使用外网或内网链接进行上传
    net?:"outerEndPoint" | "innerEndPoint";
}

interface UploadParams extends GetTokenParams {
    file: File | Blob | string;
}

interface TokenDetail {
    channel: 'IOBS' | 'Filehub' | 'OBS';
    accesskey: string;
    bucket: string;
    filekey: string;
    gmtDate: string;
    innerHost: string;
    outerHost: string;
    innerEndPoint: string;
    outerEndPoint: string;
    resPath: string;
    token: string;
}

interface TokenPromise {
    info: TokenDetail,
    form: {
        action: string;
        innerUrl: string;
        outerUrl: string;
        data: {
            [key: string]: any;
        }
        headers: {
            [key: string]: any;
        }
    }
}

interface UploadFileParams extends UploadParams {
    url: string;
    data: {
        [key: string]: any;
    };
    headers: {
        [key: string]: any;
    };
}

interface DownLoadInfo extends TokenDetail {
    innerUrl: string;
    outerUrl: string;
}


// base64转换Blob
function base64UrlToBlob(urlData: string): Blob {
    //声明类型不为 "void" 或 "any" 的函数必须有返回值
    const bytes = atob(urlData.split('.')[1]);
    const ab = new ArrayBuffer(bytes.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i< bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab]);
}

//获取token
export function getToken(config: GetTokenParams): Promise<TokenPromise> {
    return new Promise((resolve, reject) => {
        instance.request({
            url: config.tokenUrl,
            method: 'post',
            data: config.tokenData || {},
            withCredentials: true,
        }).then((res) => {
            const data = res.data;
            const result: TokenDetail = data.data;
            if (data.responseCode !== '10001') {
                reject(data.responseMsg);
            } else {
                let action = '';
                let headers = {};
                let data = {};
                let innerUrl = '';
                let outerUrl = '';
                //默认使用内网地址 ${result[net]}
                const net = config.net || 'outerEndPoint';
                if (result.channel === 'IOBS') {
                    action = `http://obs-cn-shenzhen.yun.pingan.com/upload/${result.bucket}/${result.filekey}`;
                    data = {
                        token: result.token,
                    };
                    // iobs下查看  ${result.innerEndPoint}${result.outerEndPoint}
                    innerUrl = `http://obs-cn-shenzhen.yun.pingan.com/upload/${result.bucket}/${result.filekey}`;
                    outerUrl = `http://obs-cn-shenzhen.yun.pingan.com/upload/${result.bucket}/${result.filekey}`;
                }
                if (result.channel === 'Filehub') {
                    action = result[net];
                    headers = {
                        'X-S3-AK': result.accesskey,
                        'X-S3-Timestamp': result.gmtDate,
                        'X-S3-Sign': result.token,
                    }
                }
                if (result.channel === 'OBS') {
                    action = `${result[net]}${result.resPath}`;
                    headers = {
                        Authorization: `AWS${result.accesskey}:${result.token}`,
                        'x-amz-date': result.gmtDate,
                    };
                    innerUrl = action;
                    outerUrl = action;
                }
                resolve({
                    //在 TokenPromise 类型中定义的所有 key 此处都需要有,因为上面断言当前 Promise的类型是 TokenPromise
                    info: result,
                    form: {
                        action,
                        data,
                        headers,
                        innerUrl,
                        outerUrl,
                    },
                });
            }
        })
    })
}

//上传方法
export function uploadFile(params: UploadFileParams): Promise<any>{
    const formData = new FormData();
    let file = params.file;
    let fileKeyName = 'file';
    if (typeof params.file === 'string' && params.file.indexOf(';base64') !== -1) {//说明是base64的字符串
        file = base64UrlToBlob(params.file);
    }
    if (params.filed) {//提交文件的字段名称，默认 'file',有传入则用传入的
        fileKeyName = params.filed;
    }
    if (params.data) {//需要提交到formData的内容
        for (const key in params.data) {
            if (Object.prototype.hasOwnProperty.call(params.data, key)) {
                const element = params.data[key];
                formData.append(key, element);
            }
        }
    }
    formData.append(fileKeyName, file);
    return instance.request({
        method: 'post',
        url: params.url,
        headers: params.headers,
        data: formData,
        withCredentials: false,
    });
}

//自动获取token并上传
export default async function upload(config: UploadParams): Promise<DownLoadInfo>{
    const tokenDetail = await getToken(config);
    let innerUrl = tokenDetail.form.innerUrl;
    let outerUrl = tokenDetail.form.outerUrl;
    const data = config.data || {};
    const tokenData = tokenDetail.form.data;
    const upRes = await uploadFile({
        ...config,
        data: {
            ...data,
            ...tokenData,
        },
        url: tokenDetail.form.action,
        headers: tokenDetail.form.headers,
    });
    // OBS和iobs不成功直接会返回对应的http状态码，所以只需判断filehub方式
    if(tokenDetail.info.channel === 'Filehub' && upRes.data.responseCode !== '10001'){
        await new Promise((resolve, reject) => reject(upRes.data.responseMsg));
    }
    if (upRes.data && tokenDetail.info.channel === 'Filehub') {
        innerUrl = upRes.data.data.innerUrl;
        outerUrl = upRes.data.data.outerUrl;
    }
    return {
        ...tokenDetail.info,
        innerUrl,
        outerUrl,
    }
}