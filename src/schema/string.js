import BaseSchema from './base';

class StringSchema extends BaseSchema {

    constructor(message: String){
        super();
        this._type = 'string';
        super.customizeRule({
            message,
            name: 'type',
            validator: value => typeof value === 'string'
        });
    }

    oneOf(list: Array, message: String): Object{
        super.customizeRule({
            message,
            name: 'oneOf',
            validator: value => list.indexOf(value) !== -1,
            extraParams: {
                list
            }
        });
        return this;
    }

    maxLength(length: Number, message:String): Object {
        super.customizeRule({
            message,
            name: 'maxLength',
            validator: value => value.length <= length,
            extraParams: {
                length
            }
        });
        return this;
    }

    minLength(length: Number, message: String): Object {
        super.customizeRule({
            message,
            name: 'minLength',
            validator: value => value.length >= length,
            extraParams: {
                length
            }
        });
        return this;
    }

    email(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'email',
            validator: value => {
                const reg = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                return reg.test(value);
            }
        });
        return this;
    }

    url(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'url',
            validator: value => {
                const reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
                return reg.test(value);
            }
        });
        return this;
    }

    notChinese(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'notChinese',
            validator: value => /^[^\u4e00-\u9fa5]{0,}$/.test(value)
        });
        return this;
    }

    ipv4(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'ipv4',
            validator: value => /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(value)
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

    ChineseID(message: ?String): Object {
        super.customizeRule({
            message,
            name: 'ChineseID',
            validator: value => /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
        });
        return this;
    }

}

export default function string(message: String){
    if(!(this instanceof StringSchema)){
        return new StringSchema(message);
    }
}