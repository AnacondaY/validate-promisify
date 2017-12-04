
import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== Number Validator =====', () => {

    let validator;

    let fullfill;

    before(() => {
        validator = new Validator({
            value1: Schema.number().required(),
            value2: Schema.number().integer(),
            value3: Schema.number().float(),
            value4: Schema.number().rangeOf(1, 10),
            value5: Schema.number().greaterThan(0),
            value6: Schema.number().lessThan(1),
            value7: Schema.number().oneOf([1, 2, 3]),
            value8: Schema.number().pattern(/^[0-9]*[1-9][0-9]*$/)
        });
    });

    beforeEach(() => {
        fullfill = sinon.spy();
    })

    after(() => {
        validator = null;
    });

    it('type validate', () => {
        expect(validator.syncValidate({ value1: undefined })['value1']).has.length(2);
        return validator
            .validate({ value1: undefined })
            .then(fullfill)
            .catch(errors => expect(errors['value1']).has.length(2))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate integer', () => {
        expect(validator.syncValidate({ value2: .1 })['value2']).has.length(1);
        return validator
            .validate({value2: .1})
            .then(fullfill)
            .catch(errors => expect(errors['value2']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate float', () => {
        return validator
            .validate({value3: 1})
            .then(fullfill)
            .catch(errors => expect(errors['value3']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate range', () => {
        return validator
            .validate({ value4: 0 })
            .then(fullfill)
            .catch(errors => expect(errors['value4']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate greater', () => {
        return validator
            .validate({ value5: -1 })
            .then(fullfill)
            .catch(errors => expect(errors['value5']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate less', () => {
        return validator
            .validate({ value6: 2 })
            .then(fullfill)
            .catch(errors => expect(errors['value6']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate oneOf', () => {
        return validator
            .validate({ value7: 0 })
            .then(fullfill)
            .catch(errors => expect(errors['value7']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

    it('validate pattern', () => {
        return validator
            .validate({ value8: -1 })
            .then(fullfill)
            .catch(errors => expect(errors['value8']).has.length(1))
            .then(() => expect(fullfill.called).to.be.false);
    });

});
