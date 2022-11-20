const express = require('express');
const http = require('http');
const ApiError = require('../exeptions/api-error')

// ROUTERS
const UsersRouter = require('../components/users/router');

module.exports = {
    init(app) {
        const router = express.Router();

        app.use('/v1/users', UsersRouter);

        app.use((err, req, res, next) => {
            console.log(err)
            if (err instanceof ApiError) {
                return res.status(err.status).json({message: err.message, errors: err.errors})
            }
            if (!res.status()) {
                console.log(res);
                return nexat(ApiError.BadRequest('Помилка', res))
            }
            res.status(404).send(http.STATUS_CODES[404]);
        });
        app.use(router);
    },
};
