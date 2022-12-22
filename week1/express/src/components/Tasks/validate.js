const validTaskSchema = require('./schemas/validations');
const ApiError = require('../../exeptions/api-error');

function validationFields(req, res, next) {
    const value = validTaskSchema.taskSchema.validate(req);

    if (value.error) {
        return next(ApiError.BadRequest('Validation Errors', value.error));
    }

    return next();
}
module.exports = {
    validationFields,
};
