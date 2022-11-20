const UsersValidation = require('../components/users/validate');

module.exports = {
    init(app) {
        app.use((req, res, next) => {
           return UsersValidation.validationFields(req.body, res, next);
        });
    },
};
