import { expect } from 'chai';
import sinon from 'sinon';
import Validator, { Schema } from '../src';

describe('===== Boolean Validator =====', () => {

    it('validate type', () => {
        new Validator({
            value: Schema.boolean().required()
        }).validate({
            value: undefined
        }).catch(errors => expect(errors['value']).has.length(2));
    });

    it('validate true', () => {
        new Validator({
            value: Schema.boolean().truthy()
        }).validate({
            value: true
        }).then(empty => expect(empty).to.be.undefined);
    });

    it('validate false', () => {
        new Validator({
            value: Schema.boolean().falsy()
        }).validate({
            value: false
        }).then(empty => expect(empty).to.be.undefined);
    });

});