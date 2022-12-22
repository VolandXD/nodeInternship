const validSchema = require('./schemas/validations');
const ApiError = require('../../exeptions/api-error');

function validationSignIn(req, res, next) {
    const value = validSchema.schemaSignIn.validate(req);

    if (value.error) {
        return next(ApiError.BadRequest('Validation Errors', value.error));
    }

    return next();
}

function validationAccessLogin(req, res, next) {
    const value = validSchema.schemaAccessLogin.validate(req);

    if (value.error) {
        return next(ApiError.BadRequest('Validation Errors', value.error));
    }

    return next();
}
module.exports = {
    validationSignIn,
    validationAccessLogin,
};
