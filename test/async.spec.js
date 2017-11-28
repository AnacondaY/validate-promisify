import { expect } from 'chai';
import Validator, { Schema } from '../src';

describe('===== Async Validator =====', () => {
    
    const timeout = (time, msg) => new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(msg);
            clearTimeout(timer);
        }, time);
    });

    it('async test', () => {
        const validator = new Validator({
            username: Schema.string(),
            age: Schema.number().isInteger()
        });

        return validator.validate({username: 'abc', age: 'abc'}, { fields: ['username'] }).then(ret => expect(ret).to.be.undefined);
    });

});