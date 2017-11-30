import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== Object Validator =====', () => {

    let validator;

    class SuperClass{}

    class SubClass extends SuperClass{}

    before(() => {
        validator = new Validator({
            value1: Schema.object().shapeOf({
                name: Schema.string().required(),
                age: Schema.number().required()
            }),
            value2: Schema.object().instanceOf(SuperClass),
            value3: Schema.object().instanceOnlyOf(SuperClass),
            value4: Schema.object().date().today()
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

    it('validate instanceOf', () => {
        expect(validator.syncValidate({ value2: new SubClass() })).to.be.null;
        expect(validator.syncValidate({ value2: new SuperClass() })).to.be.null;
    });

    it('validate instanceOnlyOf', () => {
        expect(validator.syncValidate({ value3: new SubClass() })['value3']).has.length(1);
        expect(validator.syncValidate({ value3: new SuperClass() })).to.be.null;
    });

    it('validate date', () => {
        expect(validator.syncValidate({ value4: new Date() })).to.be.null;
    })

});