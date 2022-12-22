const Joi = require('joi');

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
    schemaSignIn,
    schemaAccessLogin,
};
