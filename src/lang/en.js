export default {
    number: {
        type: 'Please enter number',
        greaterThan: 'Input should be greater than {{threshold}}',
        lessThan: 'Input should be less than {{threshold}}',
        rangeOf: 'Input should be greater than {{min}}, and less than {{max}}',
        oneOf: 'Input should be one of {{list}}',
        pattern: 'Mismatch the specific pattern',
        integer: 'Please enter an integer',
        float: 'Please enter a float',
        required: 'required'
    },
    string: {
        type: 'Please enter a string',
        oneOf: 'Input should be one of {{list}}',
        maxLength: 'The length of input should be less or equal than {{length}}',
        minLength: 'The length of input should be greater or equal than {{length}}',
        email: 'Mismatch email format',
        url: 'Mismatch URL format',
        ipv4: 'Mismatch IP address',
        pattern: 'Mismatch the specific pattern'
    },
    boolean:{
        
    },
    array: {

    },
    object: {

    }
};