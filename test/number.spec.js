
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
        validator
            .validate({ value1: undefined }, { fields: ['value1'] })
            .then(fullfill)
            .catch(errors => expect(errors['value1']).has.length(2))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate integer', () => {
        validator
            .validate({value2: .1}, { fields: ['value2'] })
            .then(fullfill)
            .catch(errors => expect(errors['value2']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate float', () => {
        validator
            .validate({value3: 1}, { fields: ['value3'] })
            .then(fullfill)
            .catch(errors => expect(errors['value3']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate range', () => {
        validator
            .validate({ value4: 0 }, { fields: ['value4'] })
            .then(fullfill)
            .catch(errors => expect(errors['value4']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate greater', () => {
        validator
            .validate({ value5: -1 }, { fields: ['value5'] })
            .then(fullfill)
            .catch(errors => expect(errors['value5']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate less', () => {
        validator
            .validate({ value6: 2 }, { fields: ['value6'] })
            .then(fullfill)
            .catch(errors => expect(errors['value6']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate oneOf', () => {
        validator
            .validate({ value7: 0 }, { fields: ['value7'] })
            .then(fullfill)
            .catch(errors => expect(errors['value7']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate pattern', () => {
        validator
            .validate({ value8: -1 }, { fields: ['value8'] })
            .then(fullfill)
            .catch(errors => expect(errors['value8']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

});
