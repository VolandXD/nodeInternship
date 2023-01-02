const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');
const morgan = require('../config/morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

const app = express();

morgan.init(app);

middleware.init(app);

router.init(app);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
);
app.set('port', process.env.PORT || 3000);

module.exports = app;
