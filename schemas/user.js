const Joi = require('joi');

module.exports.signupSchema = Joi.object({
    firstName: Joi.string().required(),
    middleName: Joi.string(),
    lastName: Joi.string().required(),
    dateOfBirth: Joi.date(),
    gender: Joi.string().valid('Male', 'Female'),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})