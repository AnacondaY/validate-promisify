import BaseSchema from './base';

class NumberSchema extends BaseSchema {

    constructor(message: ?String){
        super();
        this._type = 'number';
        super.customizeRule({
            message,
            name: 'type',
            validator: value => {
                return typeof value === 'number';
            }
        });
    }

    isInteger(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'isInteger',
            validator: value => /^-?\d+$/.test(value)
        });
        return this;
    }

    isFloat(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'isFloat',
            validator: value => /^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$/.test(value)
        });
        return this;
    }

    rangeOf(min: Number, max: Number, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'rangeOf',
            validator: value => value >= min && value <= max,
            extraParams: {
                min,
                max
            }
        });
        return this;
    }

    oneOf(numberList: Array<Number>, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'oneOf',
            validator: value => numberList.indexOf(value) !== -1,
            extraParams: {
                numberList
            }
        });
        return this;
    }

    lessThan(threshold: Number, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'lessThan',
            validator: value => value < threshold,
            extraParams: {
                threshold
            }
        });
        return this;
    }

    greaterThan(threshold: Number, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'greaterThan',
            validator: value => value > threshold,
            extraParams: {
                threshold
            }
        });
        return this;
    }

    greaterEqualThan(threshold: Number, message: ?String){
        super.customizeRule({
            message,
            name: 'greaterEqualThan',
            validator: value => value >= threshold,
            extraParams: {
                threshold
            }
        });
    }

    lessEqualThan(threshold: Number, message: ?String){
        super.customizeRule({
            message,
            name: 'lessEqualThan',
            validator: value => value <= threshold,
            extraParams: {
                threshold
            }
        });
        return this;
    }

    pattern(regexp: RegExp, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'pattern',
            validator: value => regexp.test(value)
        });
        return this;
    }
}

export default function number(message: ?String){
    if(!(this instanceof NumberSchema)){
        return new NumberSchema(message);
    }
}