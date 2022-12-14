const validSchema = require('./schemas/validations');
const ApiError = require('../../exeptions/api-error');

function validationFields(req, res, next) {
    const value = validSchema.schema.validate(req);

    if (value.error) {
        return next(ApiError.BadRequest('Validation Errors', value.error));
    }

    return next();
}
module.exports = {
    validationFields,
};
