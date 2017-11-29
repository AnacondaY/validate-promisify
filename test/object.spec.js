import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== Object Validator =====', () => {

    let validator;

    before(() => {
        validator = new Validator({
            value1: Schema.object().shapeOf({
                name: Schema.string().required(),
                age: Schema.number().required()
            })
        });
    });

    it('validate shapeOf', () => {
        const result = validator.syncValidate({
            value1:{
                name: undefined,
                age: 18
            }
        });
        expect(result['value1']).has.length(1);
        return validator.validate({
            value1: {
                name: undefined,
                age: 18
            }
        }).catch(errors => expect(errors['value1']).has.length(1));
    });

});