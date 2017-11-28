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
            validator: value => /\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b/.test(value)
        });
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

export default function string(message: String){
    if(!(this instanceof StringSchema)){
        return new StringSchema(message);
    }
}