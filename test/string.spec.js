import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== String Validator =====', () => {

    let fullfill;
    let validator;

    before(() => {
        validator = new Validator({
            value1: Schema.string().required(),
            value2: Schema.string().oneOf(['a', 'b', 'c']),
            value3: Schema.string().url(),
            value4: Schema.string().email(),
            value5: Schema.string().notChinese(),
            value6: Schema.string().ipv4(),
            value7: Schema.string().ChineseID(),
            value8: Schema.string().maxLength(10)
        })
    });

    beforeEach(() => {
        fullfill = sinon.spy();
    });

    after(() => {
        validator = null;
    });

    it('validate type', () => {
        return validator
            .validate({value1: undefined}, { fields: ['value1'] })
            .then(fullfill)
            .catch(errors => expect(errors['value1']).has.length(2))
            .then(expect(fullfill.called).to.be.false);
    })

    it('validate oneOf', () => {
        return validator
            .validate({ value2: 'd' }, { fields: ['value2'] })
            .then(fullfill)
            .catch(errors => expect(errors['value2']).has.length(1))
            .then(expect(fullfill.called).to.be.false);
    });

    it('validate url', () => {
        return validator
            .validate({ value3: 'https://mochajs.org/' }, { fields: [ 'value3' ] })
            .then(empty => expect(empty).to.be.undefined);
    });

    it('validate email', () => {
        return validator
            .validate({ value4: 'soloduke1@163.com' }, { fields: [ 'value4' ] })
            .then(empty => expect(empty).to.be.undefined);
    });

    it('validate notChinese', () => {
        return validator
            .validate({ value5: '我是谁' }, { fields: ['value5'] })
            .catch(errors => expect(errors['value5']).has.length(1))
    });

    it('validate ipv4', () => {
        return validator
            .validate({ value6: '172.17.28.39' }, { fields: ['value6'] })
            .then(empty => expect(empty).to.be.undefined);
    });

    it('validate ChineseID', () => {
        return validator
            .validate({ value7: '524722199403223300' }, { fields: ['value7'] })
            .then(empty => expect(empty).to.be.undefined);
    });

    it('validate maxLength', () => {
        return validator
            .validate({ value8: '1234567890' }, { fields: ['value8'] })
            .then(fullfill)
            .then(() => expect(fullfill.called).to.be.true);
    });

})