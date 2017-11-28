import BaseSchema from './base';

class BooleanSchema extends BaseSchema{
    constructor(message: ?String){
        super();
        this._type = 'boolean';
        super.customizeRule({
            message,
            name: 'type',
            validator: value => typeof value === 'boolean'
        });
    }

    isTrue(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'isTrue',
            validator: value => value === true
        });
        return this;
    }

    isFalse(message: ?String): Object {
        super.customizeRule({
            message,
            name: 'isFalse',
            validator: value => value === false
        });
        return this;
    }
}

export default function boolean(message: ?String){
    if(!(this instanceof BooleanSchema)){
        return new BooleanSchema(message);
    }
}