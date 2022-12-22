const { Router } = require('express');
const UsersComponent = require('./index');
const UsersValidation = require('./validate');

const router = Router();

router.post('/sign-in', (req, res, next) => {
    UsersValidation.validationSignIn(req.body, res, next);
}, UsersComponent.signIn);

router.get('/account', (req, res, next) => {
    UsersValidation.validationAccessLogin(req.body, res, next);
}, UsersComponent.accessLogin);

module.exports = router;
