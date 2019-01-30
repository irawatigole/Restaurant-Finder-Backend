const Validator = require('validator');
const { isEmpty } = require('./empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.address =  !isEmpty(data.address) ? data.address : '';

    if(!Validator.isLength(data.name, { min: 4, max: 64 })) {
        errors.name = 'Name must be between 4 to 64 chars';
    }
    
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(Validator.isEmpty(data.address)) {
        errors.address = 'Address field is required';
    }

    if(!Validator.isLength(data.address, { min: 5, max: 1000 })) {
        errors.address = 'Address must be between 5 to 1000 chars';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required';
    }

    if(!Validator.isLength(data.password, {min: 8, max: 30})) {
        errors.password = 'Password must have 8 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}