const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCommentsInput(data) {

    let errors = {};

    data.Email = !isEmpty(data.Email) ? data.Email : '';
    data.Message = !isEmpty(data.Message) ? data.Message : '';

    if(validator.isEmpty(data.Email)) {
        errors.email = 'The email field is required';
    }

    if(validator.isEmpty(data.Message)) {
        errors.message = 'The message field is required'
    }

    if(!validator.isEmail(data.Email)) {
        errors.email = 'Email is invalid'
    }

    if(!validator.isLength(data.Message, { min: 0, max: 150 })) {
        errors.message = 'Message needs to be between 0 and 150 characters'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};