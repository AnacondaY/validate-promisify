export default {
    number: {
        type: '请输入数字',
        greaterThan: '输入值应大于等于{{threshold}}',
        lessThan: '输入值应小于等于{{threshold}}',
        rangeOf: '输入值应该大于等于{{min}}, 小于等于{{max}}',
        oneOf: '输入值应为{{list}}中的成员',
        pattern: '输入值不符合指定格式',
        integer: '请输入整数',
        float: '请输入浮点数',
        required: '必填'
    },
    string: {
        type: '请输入字符串',
        oneOf: '输入值应为{{list}}中的成员',
        maxLength: '输入值最大长度为{{length}}',
        minLength: '输入值最小长度为{{length}}',
        email: '电子邮箱格式错误',
        url: 'URL格式错误',
        notChinese: '请输入非汉字字符',
        ipv4: 'IP地址格式错误',
        ChineseID: '身份证号格式错误',
        pattern: '输入值不符合指定格式'
    },
    boolean:{
        
    },
    array: {

    },
    object: {

    }
};