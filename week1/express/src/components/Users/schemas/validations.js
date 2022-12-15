const Joi = require('joi');

const schema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).with('firstName', 'lastName').with('email', 'password');
const schemaSignIn = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

});
const schemaAccessLogin = Joi.object({
    token: [
        Joi.string(),
        Joi.number(),
    ],
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
}).with('email', 'token');

module.exports = {
    schema,
    schemaSignIn,
    schemaAccessLogin,
};
