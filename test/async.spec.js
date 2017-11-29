import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== Async Validator =====', () => {

    const mockRequest = () => new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject();
            clearTimeout(timer);
        }, 1000);
    })

    it('validate async', () => {
        const validator = new Validator({
            value: Schema.string().async(mockRequest)
        })
        return validator
            .validate({value: 'some value'})
            .catch(errors => expect(errors['value']).has.length(1))
    });

});