import {mobile, name, positiveInteger, phoneNumber, naturalNumber, IDNumber, email} from './validateExp';
import {passwordExp} from './validateFun';
export default {
    install(Vue, options){
        //密码格式验证
        const isvalidatePassword = (rule, value, callback) => {
            if (!value) {
                callback();
            } else {
                if (!passwordExp(value)) {
                    callback(new Error('8到15位（数字/字母/特殊符号中的两种）'));
                } else {
                    callback();
                }
            }
        };
        //验证身份证号
        const isvalidateIDNumber = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (!IDNumber.test(value)) {
                    callback(new Error('您输入的身份证号码不正确'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*验证手机号 */
        const isvalidateMobile = (rule, value, callback) => {
            if (value !== null && value !== "") {
                value = value.trim();
                if (!mobile.test(value)) {
                    callback(new Error('您输入的手机号码不正确'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*验证邮箱 */
        const isvalidateEmail = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (!email.test(value)) {
                    callback(new Error('您输入的邮箱不正确'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*验证手机号码 */
        const isvalidatePhoneNumber = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (!phoneNumber.test(value)) {
                    callback(new Error('您输入的手机号码不正确'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*验证中文名或英文名（只能输入字母和汉字） */
        const isvalidateName = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (!name.test(value)) {
                    callback(new Error('含有非法字符（只能输入字母和汉字）'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*只能输入正整数 */
        const isvalidatePositiveInteger = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (!positiveInteger.test(value)) {
                    callback(new Error('只能输入正整数'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*只能输入自然数（正整数+0） */
        const isvalidateNaturalNumber = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (!naturalNumber.test(value)) {
                    callback(new Error('只能输入自然数'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /*不能都是空格 */
        const nonEmpty = (rule, value, callback) => {
            if (value !== null && value !== "") {
                if (value.trim().length === 0) {
                    callback(new Error('内容不能为空'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        /**
         * 参数 item
         * required true 必填项
         * maxLength 字符串的最大长度
         * min < max
         */
        Vue.prototype.validateRules = (item) => {
            const rules = [];
            if (item.required) {
                rules.push({
                    required: item.required,
                    message: item.message,
                });
            }
            if (item.max) {
                rules.push({
                    max: item.max,
                    message: item.maxMess,
                });
            }
            if (item.validator) {
                rules.push({
                    validator: item.validator,
                });
            }
            if (item.type) {
                const type = item.type;
                switch (type) {
                    case 'password':
                        rules.push({
                            validator: isvalidatePassword
                        });
                        break;
                    case 'IDNumber':
                        rules.push({
                            validator: isvalidateIDNumber
                        });
                        break;
                    //数字在某个区间内
                    case 'numberBetween':
                        rules.push({
                            validator: (rule, value, callback) => {
                                if (value !== null && value !== "") {
                                    if (!naturalNumber.test(value)) {
                                        callback(new Error('含有非法字符（只能输入0和正整数）'));
                                    } else if(value < item.minNum || value > item.maxNum) {
                                        callback(new Error(`数字应该在${item.minNum}与${item.maxNum}之间`));
                                    }
                                    callback();
                                } else {
                                    callback();
                                }
                            },
                        });
                        break;
                    case 'mobile': 
                        rules.push({
                            validator: isvalidateMobile,
                        });
                        break;
                    case 'email':
                        rules.push({
                            validator: isvalidateEmail,
                        });
                        break;
                    case 'name':
                        rules.push({
                            validator: isvalidateName,
                        });
                        break;
                    case 'positiveInteger':
                        rules.push({
                            validator: isvalidatePositiveInteger,
                        });
                        break;
                    case 'naturalNumber':
                        rules.push({
                            validator: isvalidateNaturalNumber,
                        });
                        break;
                    case 'phoneNumber':
                        rules.push({
                            validator: isvalidatePhoneNumber,
                        });
                        break;
                    case 'nonEmpty':
                        rules.push({
                            validator: nonEmpty,
                        });
                        break;
                    default:
                        rules.push({});
                        break;
                }
            }
            return rules;
        };
    }
}