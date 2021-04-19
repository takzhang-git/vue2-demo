/**
 * 一般调接口拿后端数据是一个二进制流
 */
import axios from 'axios'
import qs from 'qs'
const fileTypes = {
    'application/pdf': '.pdf',
    'application/vnd.ms-excel': '.xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
}
let instance = axios.create({
    method: 'get',
    transformRequest: [
        function(data){
            return qs.stringify(data, {
                arrayFormat: 'brackets',
            });
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    timeout: 120000,
    responseType: 'json',
});
//调接口下载 后台返回二进制流 通过src或者msSaveBlob生成文件
export default function downloadFile(options){
    //要处理reader.onload 异步事件，为解决多个异步事件，使用Promise
    return new Promise((resolve, reject) => {
        let {
            url,
            method = 'get',
            params = {},
            data = {},
            fileName = '',
            fileType = '',
            contentType = '',
            responseType = 'blob',
        } = options;
        url = url.indexOf('?') === -1 ? `${url}?t=${new Date().getTime()}` : `${url}&t=${new Date().getTime()}`;
        let ajax = instance;
        const paramsRequest = {
            url,
            method,
            params,
            data,
            responseType,
            contentType,
            withCredentials: false,
        }
        //get 上设置了自己的contentType,所以用新的实例
        if (method === 'post' || contentType) {
            ajax = axios;
            paramsRequest.headers = {
                'Content-Type': contentType || 'application/json; charset=utf-8;',
            };
        }
        ajax.request(paramsRequest).then(res => {
            //这里走 FileReader对象 reader.result 会根据返回的数据类型（二进制或json）来返回二进制和json
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    //使用 try...catch... 如果报错说明是二进制的字符串 就走下载的方法 否则就是错误信息
                    const response = JSON.parse(reader.result);
                    if (response.responseCode === '10001') {
                        //调用下载的方法
                        resSucc(options, res, resolve);
                    } else {
                        reject(response);
                    }
                } catch (error) {
                    resSucc(options, res, resolve);
                }
            };
            reader.readAsText(new Blob([res.data]));
        }).catch(err => {
            reject({
                ...err, responseMsg: err.message
            });
        });//这里统一一下错误信息的key为responseMsg
    });
}
// 下载的方法
function resSucc(options, res, resolve){
    //从87行到107行的操作都只是为了拿到fileTitle，即文件名称.后缀
    let {fileType = '', fileName = ''} = options;
    //做些兼容 只传了文件名没传后缀名的情况
    if (!fileType && fileName) {
        const arr = fileName.split('.');
        fileType = arr.pop();
        fileName = arr.join('.');
    }
    // 传了后缀名但没带 . 的情况 兼容一下
    if(fileType[0] !== '.') fileType = `.${fileType}`;
    //从后台返回的headers中的content-type拿到值在fileTypes里面匹配，如果匹配不到就用传入的后缀名，contentType实际是文件后缀名
    const contentType = fileTypes[res.headers['content-type']] || fileType;
    const contentDisposition = res.headers['content-disposition'] || '';
    //后台返回res.headers示例：
    //Content-Disposition: attachment; Content-Type: application/pdf; filename=export_dis_15767864267.pdf
    const patt = new RegExp("filename=['\"]?([^;]+\\.[^\\.;]+)['\"]?;?");
    let disposition = '';
    if (patt.test(contentDisposition)) disposition = decodeURI(RegExp.$1);
    let fileTitle = fileName
    ? `${(fileName.includes('.') ? fileName.split('.')[0] : fileName) || Date.now()}${contentType}`
    : disposition;
    if (!fileTitle) fileTitle = Date.now() + contentType;
    //声明二进制流对象并下载
    const blob = new Blob([res.data]);
    if ('download' in document.createElement('a')) {
        //非IE下载
        const elink = document.createElement('a');//实际就是个a链接
        elink.download = decodeURIComponent(fileTitle);
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); //释放URL对象
        document.body.removeChild(elink);
    } else {
        // IE10+ 下载
        navigator.msSaveBlob(blob, fileTitle);
    }
    return resolve();
}