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

    truthy(message: ?String): Object{
        super.customizeRule({
            message,
            name: 'truthy',
            validator: value => value === true
        });
        return this;
    }

    falsy(message: ?String): Object {
        super.customizeRule({
            message,
            name: 'falsy',
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