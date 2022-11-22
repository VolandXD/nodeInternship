const validSchema = require('../../models/validations')
const ApiError = require('../../exeptions/api-error');
class ValidationController {
    async validationFields(req, res, next) {
        try {
            const value = await validSchema.schema.validate(req);
            if (value.error) {
                return next(ApiError.BadRequest('Помилка валідації', value.error))
            }
            next();
        } catch (e) {
            next(e)
        }
    }
    async validationSignIn(req, res, next) {
        try {
            const value = await validSchema.schemaSignIn.validate(req);
            if (value.error) {
                return next(ApiError.BadRequest('Помилка валідації', value.error))
            }
            next();
        } catch (e) {
            next(e)
        }
    }
    async validationAccessLogin(req, res, next) {
        try {
            const value = await validSchema.schemaAccessLogin.validate(req);
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
