const validSchema = require('../../models/validations')
const ApiError = require('../../exeptions/api-error');
class ValidationController {
    async validationFields(req, res, next) {
        try {
            const value = await validSchema.validate(req);
            if (value.error) {
                return next(ApiError.BadRequest('Помилка валідації', value.error))
            }
            next();
        } catch (e) {
            next(e)
        }
    }
}
module.exports = new ValidationController();
