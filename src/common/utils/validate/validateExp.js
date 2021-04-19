export const email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/; //邮箱
export const mobile = /^1(3|4|5|6|7|8)\d{9}$/; //电话
export const name = /^[a-zA-Z\u4e00-\u9fa5]+$/; //中文名或英文名
export const digit = /^[0-9]*$/;
export const positiveInteger = /^[1-9]\d*$/;
export const naturalNumber = /(^0$)|(^[1-9]\d*$)/; //自然数包括0
export const phoneNumber = /(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^1(|3|4|5|6|7|8)\d{9}$)/; //手机号
export const IDNumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //身份证号