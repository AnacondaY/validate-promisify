import BaseSchema from '../schema/base';
import { isEmptyObject, isObject } from '../schema/utils';

const defaultOptions = {
    stopByFirstRule: false, 
    stopByFirstField: false
};

export default class Validator{
    
    constructor(schemaMap: Object, options: ?Object){
        if(!isObject){
            throw new Error(`'schemaMap' requires an object, but receives a(an) ${typeof schemaMap}`);
        }
        this._schemaMap = schemaMap;
        this._options = {
            ...defaultOptions,
            ...options
        };
        
    }

    syncValidate(values: Object, options: ?Object = this._options): Object{
        const ret = {};
        const { stopByFirstRule, stopByFirstField, fields } = options;
        const entries = Object.entries(values);
        
        const pushToStack = (key, value) => {
            const schema = this._schemaMap[key];
            if(!(schema instanceof BaseSchema)){
                throw new Error(`The schema '${key}' should be the instance of BaseSchema`);
            }
            const errors = schema.syncValidate(value, stopByFirstRule);
            if(errors){
                ret[key] = errors;
            }
        };
        
        for(let i = 0; i < entries.length; i ++){
            const key = entries[i][0];
            const value = entries[i][1];
            if(Array.isArray(fields) && fields.indexOf(key) !== -1){
                pushToStack(key, value);
            }else{
                pushToStack(key, value);
            }
        }
        return isEmptyObject(ret) ? null : ret;
    }   
    
    validate(values: Object, options: ?Object = this._options): Promise{
        const promiseStack = [];
        const { fields } = options;
        
        const pushToStack = (key, value) => {
            if(!(this._schemaMap[key] instanceof BaseSchema)){
                throw new Error(`The schema '${key}' should be the instance of BaseSchema`);
            }
            const promise = new Promise(resolve => {
                this._schemaMap[key].validate(value).then(result => {
                    const errors = result.filter(ret => ret !== null);
                    if(errors.length){
                        resolve({ [key]: errors });
                    }else{
                        resolve();
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
                const messages = errors.reduce((prevErr, cur) => {
                    if(cur && prevErr){
                        return Object.assign({}, prevErr, cur);
                    }
                    return {};
                });
                if(messages){
                    reject(messages);
                }else{
                    resolve();
                }
            });
        });
    }
}