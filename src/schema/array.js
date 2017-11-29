import BaseSchema from './base';

class ArraySchema extends BaseSchema {

    constructor(message: ?String){
        super();
        this._type = 'array';
        this.customizeRule({
            message,
            name:'type',
            validator: value => {
                const valid = Array.isArray(value);
                if(valid){
                    this._isArray = true;
                }
                return valid;
            }
        });
    }

    maxLength(length: Number, message: ?String): Object{
        this.customizeRule({
            message,
            name: 'maxLength',
            validator: value => this._isArray && value.length <= length,
            extraParams: {
                length
            }
        });
        return this;
    }

    minLength(length: Number, message: ?String): Object {
        this.customizeRule({
            message,
            name: 'minLength',
            validator: value => this._isArray && value.length >= length,
            extraParams: {
                length
            }
        });
        return this;
    }

    subsetOf(superset: Array, message: ?String): Object {
        this.customizeRule({
            message,
            name:'subsetOf',
            validator: value => {
                if(this._isArray){
                    return value.every(v => {
                        return superset.indexOf(v) !== -1;
                    });
                }
                return false;
            },
            extraParams: {
                superset
            }
        });
        return this;
    }

    supersetOf(subset: Array, message: ?String): Object{
        this.customizeRule({
            message,
            name: 'supersetOf',
            validator: value => {
                if(this._isArray){
                    return subset.every(v => {
                        return value.indexOf(v) !== -1;
                    });
                }
                return false;
            },
            extraParams: {
                subset
            }
        });
        return this;
    }

    unique(message: ?String): Object{
        this.customizeRule({
            message,
            name: 'unique',
            validator: value => {
                const map = {};
                if(this._isArray){
                    for(let i = 0; i < value.length; i++){
                        if(typeof map[value[i]] === 'undefined'){
                            map[value[i]] = 1;
                        }else{
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            }
        });
        return this;
    }

}

export default function array(message: ?String){
    if(!(this instanceof ArraySchema)){
        return new ArraySchema(message);
    }
}