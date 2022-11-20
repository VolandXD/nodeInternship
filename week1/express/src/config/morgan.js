const morgan = require('morgan');

module.exports = {
    init(app) {
        app.use(morgan('tiny'));
        morgan.token('param', (req, res, param) => {
            return req.params[param];
        });
    },
};
