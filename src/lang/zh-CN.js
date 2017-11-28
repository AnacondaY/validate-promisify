export default {
    number: {
        type: '请输入数字',
        greaterThan: '输入值应大于等于{{threshold}}',
        lessThan: '输入值应小于等于{{threshold}}',
        rangeOf: '输入值应该大于等于{{min}}, 小于等于{{max}}',
        oneOf: '输入值应为{{numberList}}中的一个',
        pattern: '输入值不符合指定格式',
        isInteger: '请输入整数',
        isFloat: '请输入浮点数',
        isRequired: '必填'
    },
    string: {
        type: '请输入字符串'
    }
};