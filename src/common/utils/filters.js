export default {
    mapStatus(status){
        const m = new Map(
            [
                ['fail', '不及格'],
                ['pass', '及格'],
                ['common', '一般'],
                ['good', '良好'],
                ['excellent', '优秀'],
                ['perfect', '完美'],
            ]
        );
        const arr1 = ['fail', 'pass', 'common', 'good', 'excellent', 'perfect'];
        const arr2 = ['不及格', '及格', '一般', '良好', '优秀', '完美'];
        const str = status;
        if (arr2.includes(str)) {
            return str;
        }
        if (arr1.includes(str)) {
            return m.get(str);
        }
        return '不存在的key值';
    }
}