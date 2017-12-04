import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== Array Validator =====', () => {

    let validator = new Validator({
        value1: Schema.array().required(),
        value2: Schema.array().maxLength(3),
        value3: Schema.array().subsetOf([1, 2]),
        value4: Schema.array().supersetOf([1, 2, 3, 4]),
        value5: Schema.array().unique()
    });


    it('validate type', () => {
        expect(validator.syncValidate({ value1: undefined })['value1']).to.has.length(2);
        return validator
            .validate({value1: undefined})
            .catch(errors => expect(errors['value1']).to.has.length(2));
    });

    it('validate maxLength', () => {
        expect(validator.syncValidate({ value2: [1, 2, 3, 4] })['value2']).to.has.length(1);
        return validator
            .validate({ value2: [ 1, 2, 3, 4 ] })
            .catch(errors => expect(errors['value2']).has.length(1));
    });

    it('validate subset', () => {
        expect(validator.syncValidate({ value3: [1, 2, 3] })['value3']).has.length(1);
        return validator
            .validate({ value3: [1, 2, 3] })
            .catch(errors => expect(errors['value3']).has.length(1));
    });

    it('validate superset', () => {
        expect(validator.syncValidate({ value4: [1, 2, 3] })['value4']).has.length(1);
        return validator
            .validate({ value4: [1, 2, 3] })
            .catch(errors => expect(errors['value4']).has.length(1));
    });

    it('validate unique', () => {
        expect(validator.syncValidate({ value5: [1, 2, 3, 3] })['value5']).has.length(1);
        return validator
            .validate({ value5: [1, 2, 3, 3] })
            .catch(errors => expect(errors['value5']).has.length(1));
    });


});