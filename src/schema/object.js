import BaseSchema from './base';
import { parseDate } from './utils';

class ObjectSchema extends BaseSchema {

    constructor(message: ?String){
        super();
        this._type = 'object';
        this.customizeRule({
            message,
            name: 'type',
            validator: value => this._isObject(value)
        });
    }

    _isObject(value: mixed): Boolean{
        return typeof value === 'object';
    }

    _isDate(value: mixed): Boolean {
        return value instanceof Date;
    }

    oneOf(list: Array<Object>, message: ?String): Object {
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

    shapeOf(shape: Object, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'shapeOf',
            validator: value => {
                if(this._isObject(value)){
                    return Object.entries(shape).every(entry => {
                        const [ key, schema ] = entry;
                        return schema.syncValidate(value[key]);
                    });
                }
                return false;
            },
            extraParams: {
                shape
            }
        });
        return this;
    }

    instanceOf(cls: Function, message: ?String): Object{
        super.customizeRule({
            message,
            name: 'instanceOf',
            validator: value => value instanceof cls,
            extraParams: {
                cls: cls.name
            }
        });
        return this;
    }

    instanceOnlyOf(cls: Function, message: ?String): Object {
        super.customizeRule({
            message,
            name: 'instanceOnlyOf',
            validator: value => {
                if(this._isObject(value)){
                    return value.__proto__.constructor === cls.prototype.constructor;
                }
                return false;
            }
        });
        return this;
    }

    notNull(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'notNull',
            validator: value => Object.prototype.toString.call(value) !== '[object Null]'
        });
        return this;
    }

    date(message: ?String): Object {
        super.customizeRule({
            message,
            name:'date',
            validator: value => this._isDate(value)
        });
        return this;
    }

    today(message: ?String){
        super.customizeRule({
            message,
            name: 'today',
            validator: value => {
                if(this._isDate(value)){
                    const { date: d1, month: m1, year: y1 } = parseDate(value);
                    const { date: d2, month: m2, year: y2 } = parseDate(new Date());
                    return d1 === d2 && m1 === m2 && y1 === y2;
                }
                return false;
            }
        });
        return this;
    }

    currentMonth(message: ?String){
        super.customizeRule({
            message,
            name: 'currentMonth',
            validator: value => {
                if(this._isDate(value)){
                    const { month: m1, year: y1 } = parseDate(value);
                    const { mobth: m2, year: y2 } = parseDate(new Date());
                    return m1 === m2 && y1 === y2;
                }
                return false;
            }
        });
    }

    currentYear(message: ?String){
        super.customizeRule({
            message,
            name: 'currentYear',
            validator: value => {
                if(this._isDate(value)){
                    return value.getFullYear() === new Date().getFullYear();
                }
                return false;
            }
        });
    }

}

export default function object(message: ?String): Object{
    if(!(this instanceof ObjectSchema)){
        return new ObjectSchema(message);
    }
}