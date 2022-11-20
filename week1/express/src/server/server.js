const express = require('express');
const middleware = require('../config/middleware');
const router = require('../config/router');
const morgan = require('../config/morgan');
const validations = require('../config/validations');

const app = express();

morgan.init(app);

middleware.init(app);

validations.init(app);

router.init(app);


app.set('port', process.env.PORT || 3000);

module.exports = app;
