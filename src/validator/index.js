import BaseSchema from '../schema/base';
import { isEmptyObject } from '../schema/utils';

const defaultOptions = {
    stopByFirstRule: false, 
    stopByFirstField: false
};

export default class Validator{
    
    constructor(schemaMap: Object, options: ?Object){
        this._schemaMap = schemaMap;
        this._options = {
            ...defaultOptions,
            ...options
        };
        
    }

    syncValidate(values: Object, options: ?Object = this._options): Object{
        const ret = {};
        const { stopByFirstRule, stopByFirstField } = options;
        const entries = Object.entries(values);
        for(let i = 0; i < entries.length; i ++){
            const key = entries[i][0];
            const value = entries[i][1];
            const schema = this._schemaMap[key];
            if(schema){
                const errors = schema.syncValidate(value, stopByFirstRule);
                if(errors){
                    ret[key] = errors;
                    if(stopByFirstField){
                        break;
                    }
                }
            }
        }
        return isEmptyObject(ret) ? null : ret;
    }   
    
    validate(values: Object, options: ?Object = this._options): Promise{
        const promiseStack = [];
        const { fields } = options;
        
        const pushToStack = (key, value) => {
            const promise = new Promise(resolve=> {
                this._schemaMap[key].validate(value).then(result => {
                    const errors = result.filter(ret => ret !== null);
                    if(errors.length){
                        resolve({
                            field: key,
                            errors
                        });
                    }else{
                        resolve(false);
                    }     
                });
            });
            promiseStack.push(promise);
        };
        
        Object.entries(values).forEach(entry => {
            const [ key, value ] = entry;
            if(fields && Array.isArray(fields) && fields.length){
                if(fields.indexOf(key) !== -1){
                    pushToStack(key, value);
                }
            }else{
                pushToStack(key, value);
            }    
        });

        return new Promise((resolve, reject) => {
            Promise.all(promiseStack).then(errors => {              
                errors = errors.filter(err => err !== false);
                if(errors.length){
                    reject(errors);
                }else{
                    resolve();
                }
            });
        });
    }
}