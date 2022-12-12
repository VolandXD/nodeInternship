const express = require('express');
const http = require('http');
const ApiError = require('../exeptions/api-error');

// ROUTERS
const UsersRouter = require('../components/Users/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/users', UsersRouter);

        app.use((err, req, res, next) => {
            if (err instanceof ApiError) {
                return res.status(err.status).json({ message: err.message, errors: err.errors });
            }
            if (!res.status()) {
                return next(ApiError.BadRequest('Error', res));
            }
            res.status(404).send(http.STATUS_CODES[404]);

            return next();
        });
        app.use(router);
    },
};
