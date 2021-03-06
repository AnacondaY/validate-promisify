import lang from '../lang';

const INTEPOLATION_REG = /(%|)\{\{([0-9a-zA-Z_]+)\}\}/g;

export default class BaseSchema {

    static _locale = lang['zh-CN']

    constructor(){
        this._rules = [];
    }

    get _selfLocale(){
        return BaseSchema._locale[this._type] || {};
    }

    _isEmptyValue(value: mixed): Boolean{
        if(typeof value === 'string'){
            value = value.trim();
            return !!value;
        }else if(Array.isArray(value)){
            return value.length > 0;
        }else{
            return typeof value !== 'undefined' && value !== null;
        }
    }

    _transform(template: String, params: Object): String{
        return template.replace(INTEPOLATION_REG, (match, prefix, item, index) => {
            if(
                item &&
                template[index] === '{' &&
                template[index + 1] === '{' &&
                template[index + match.length - 2] === '}' &&
                template[index + match.length - 1] === '}'
            ){
                return params[item];
            }else{
                return '';
            }
        });
    }

    _getDefaultMessage(name: String, extraParams: Object = {}): String{
        const message = this._selfLocale[name];
        return this._transform(message || '', extraParams);
    }

    syncValidate(value: mixed, stopByFirstInvalidRule: Boolean = false): mixed{
        const errors = [];
        for(let i = 0; i < this._rules.length; i ++){
            let { validator, message, name, extraParams } = this._rules[i];
            let valid;
            try{
                valid = validator(value);
            }catch(err){
                valid = false;
            }
            if(valid === false){
                message = message || this._getDefaultMessage(name, extraParams) || '';
                errors.push(message);
            }
        }
        return !errors.length ? null : errors;
    }

    validate(value: mixed): Promise{
        const promiseStack = [];
        for(let i = 0; i < this._rules.length; i ++){
            const promise = new Promise(resolve => {
                let { validator, message, name, extraParams } = this._rules[i];
                let valid;
                try{
                    valid = validator(value);
                }catch(err){
                    valid = false;
                }
                if(valid === false){
                    message = message || this._getDefaultMessage(name, extraParams) || '';
                    resolve(message);
                }else if(valid && valid.then){
                    valid = Promise.resolve(valid);
                    valid
                        .then(() => {
                            resolve(null);
                        })
                        .catch(() => {
                            resolve(message);
                        });
                }else{
                    resolve(null);
                }
            });
            promiseStack.push(promise);
        }
        return Promise.all(promiseStack);
    }

    async(promisify: Function, message: ?String){
        if(typeof promisify === 'function'){
            this._rules.push({
                message: message || '',
                validator: value => promisify(value)
            });
        }
        return this;
    }

    required(message: ?String): Object{
        this._rules.unshift({
            message,
            name:'required',
            validator: value => this._isEmptyValue(value)
        });
        return this;
    }

    customizeRule(rule: Object): Object{
        const { message, validator, name, extraParams } = rule;
        if(typeof validator !== 'function'){
            throw new Error(`the prop 'validator' expects a function, but receives a typeof ${validator}`);
        }
        this._rules.push({
            name,
            message,
            validator,
            extraParams
        });
        return this;
    }

}