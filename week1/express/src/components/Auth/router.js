const { Router } = require('express');
const AuthComponent = require('./index');
const AuthValidation = require('./validate');

const router = Router();

router.post('/sign-in', (req, res, next) => {
    AuthValidation.validationSignIn(req.body, res, next);
}, AuthComponent.signIn);

router.get('/account', (req, res, next) => {
    AuthValidation.validationAccessLogin(req.body, res, next);
}, AuthComponent.accessLogin);

module.exports = router;
