import { expect } from 'chai';
import Validator, { Schema } from '../src';

describe('===== Number Validator =====', () => {

    let validator;

    before(() => {
        validator = new Validator({
            number: Schema.number().required(),
            int: Schema.number().integer(),
            //float: Schema.number().isFloat(),
            //range: Schema.number().rangeOf(1, 10),
            //greaterThan: Schema.number().greaterThan(0),
            //lessThan: Schema.number().lessThan(1),
            //oneOf: Schema.number().oneOf([1, 2, 3]),
            //pattern: Schema.number().pattern(/^[0-9]*[1-9][0-9]*$/)
        });
    });

    after(() => {
        validator = null;
    });

    it('type validate', () => {
        return validator.validate({ number: undefined }, { fields: 'number' })
            .catch(errors => expect(errors[0].errors).has.length(2));
        //expect(validator.validate({number: 123})).to.be.null;
        //expect(validator.validate({number: undefined})['number']).to.have.keys('type', 'isRequired');
    });

    it('validate integer', () => {
        return validator.validate({int: .5}, { fields: ['int'] })
            .catch(errors => expect(errors[0].errors).has.length(1));
    });

    // it('validate integer', () => {
    //     expect(validator.validate({int: 1})).to.be.null;
    //     expect(validator.validate({int: .1})['int']).to.have.keys('isInteger');
    // });

    // it('validate float', () => {
    //     expect(validator.validate({float: .1})).to.be.null;
    //     expect(validator.validate({float: 1})['float']).to.have.keys('isFloat');
    // });

    // it('validate range', () => {
    //     expect(validator.validate({range: 5})).to.be.null;
    //     expect(validator.validate({range: -5})['range']).to.have.keys('rangeOf');
    // });

    // it('validate greater and less', () => {
    //     expect(validator.validate({greaterThan: 1})).to.be.null;
    //     expect(validator.validate({lessThan: 0})).to.be.null;
    //     expect(validator.validate({greaterThan: -1})['greaterThan']).to.have.keys('greaterThan');
    //     expect(validator.validate({lessThan: 1})['lessThan']).to.have.keys('lessThan');
    // });

    // it('validate oneOf', () => {
    //     expect(validator.validate({oneOf: 2})).to.be.null;
    //     expect(validator.validate({oneOf: 0})['oneOf']).to.have.keys('oneOf');
    // });

    // it('validate pattern', () => {
    //     expect(validator.validate({pattern: 1})).to.be.null;
    //     expect(validator.validate({pattern: -1})['pattern']).to.have.keys('pattern');
    // });

});
