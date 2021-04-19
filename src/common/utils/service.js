import axios from 'axios';
//引入公共host，一般会根据不同的场景来返回值，比如不同的环境，不同的系统，还有的请求后台本地服务器ip
import {host} from 'xxx/xxxx';
//创建axios实例对象
const instance = axios.create({
    baseURL: `${host}/xxx`,
    withCredentials: false,// `withCredentials` 表示跨域请求时是否需要使用凭证
})
/**
 * 请求参数配置
 * @param {*} [params={}]
 * @param {string} params.method 请求方法，默认post
 * @param {string} params.url 请求地址
 * @param {string} params.responseType 接收类型
 * @param {object} params.data 需要提交的数据 
 * @param {object} params.timeout 超时时间，默认30秒
 * @param {boolean} params.fileFlow 是否是文件流
 * @param {boolean} params.checkCode 是否需要检查状态码，默认检查
 * @param {boolean} params.throwCatch 是否自动弹出错误信息，默认自动弹出
 */
//声明默认配置的参数
const defaultConfig = {
    method: 'post',
    checkCode: true,
    timeout: 30000,
    fileFlow: false,
    throwCatch: true,
}
//导出默认方法
export default function(params={}){
    const config = {
        ...defaultConfig,
        ...params,
    }
    return new Promise((resolve, reject) => {
        //发起请求
        instance.request({
            method: config.method,
            headers: {
                Accept: 'application/json;charset=utf-8',
                'Content-type': config.fileFlow ? 'multipart/form-data' : 'application/json',
                ...config.headers,
            },
            responseType: config.responseType || '',
            url: config.url,//此处的url是调用时传入的url，实际请求的url是baseUrl和传入的url拼接的；
            data: config.data,
            timeout: config.timeout,
        }).then((res) => {
            if (config.checkCode) {
                //调用成功的方法
                axiosThen(config, res.data, config.throwCatch, resolve, reject);
            } else {
                resolve(res.data);
            }
        }).catch((err) => {
            //调用失败的方法
            axiosCatch(err, reject, config);
        });
    })
}
//定义axios成功的回调处理方法
function axiosThen(config, data, throwCatch, resolve, reject) {
    //返回的二进制流
    if (config.responseType === 'blob') {
        const type = data.type;
        const blob = new Blob([data]);
        if (type.indexOf('application/octet-stream') === -1) {//返回的非文件流，则有异常
            const reader = new FileReader();
            reader.onload = (event) => {
                const msg = JSON.parse(reader.result);//返回的错误message字符串，转化为对象
                //调用数据处理的方法
                dealData(config, msg, throwCatch, resolve, reject);
            }
            reader.readAsText(blob);
        } else {//没有异常，按照期望返回二进制流
            // blob里面不包含responseCode,只有文件本身的内容，故手动写一个返回的数据对象
            dealData(config, { responseCode: '10001', data: blob}, throwCatch, resolve, reject);
        }
    } else {
        dealData(config, data, throwCatch, resolve, reject);
    }
}
//定义axios失败的回调处理方法
function axiosCatch(err, reject, config) {
    let cancelText = '';
    let needThrow = config.throwCatch;
    if (Object.prototype.hasOwnProperty.call(err, 'message') && err.message === '终止请求') {
        cancelText = {statusText: err.message};
        needThrow = false;
    }
    // or 方法用来返回第一个为真的元素对象
    const response = err.response || cancelText || {statusText: '网络异常，请检查网络后重试！'};
    let errMsg = response.statusText;
    if (response.status) {//说明 response是err.response
        errMsg += `${response.status}`;
    }
    //调用处理catch弹出提示的方法
    promiseCatch(() => reject(response), errMsg, needThrow);
}
//处理数据的方法
function dealData(config, data, throwCatch, resolve, reject) {
    if (data.responseCode === '10001') {
        resolve(data);
    } else {
        let errmsg = data.responseMsg || '接口返回异常';
        errmsg = errmsg.substring(0,30);
        promiseCatch(() => reject(data), errmsg, throwCatch);
    }
}
//处理promise的catch弹出错误提示的方法
function promiseCatch(next, throwMsg, throwTag = true) {
    if (throwTag) {
        alert(simpleXSSFilter(throwMsg));
        /*
        此处用最简单的原生alert弹出错误；
        如果项目引用了弹框提示的插件或者UI组件，例如在组件中可使用this.$message.error()方法，那这里可用
        Vue.protoType.$message.error()调用插件或UI组件方法;
         */
    }
    next();
}
//简易过滤XSS攻击的方法
function simpleXSSFilter(str) {
    if (str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    return '';
}