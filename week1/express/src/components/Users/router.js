const { Router } = require('express');
const UsersComponent = require('./index');
const UsersValidation = require('./validate');

const router = Router();

router.post('/', async (req, res, next) => {
    await UsersValidation.validationFields(req.body, res, next)
}, UsersComponent.create);

router.post('/sign-in',async (req, res, next) => {
    await UsersValidation.validationSignIn(req.body, res, next)
}, UsersComponent.signIn);

router.get('/account',async (req, res, next) => {
    await UsersValidation.validationAccessLogin(req.body, res, next)
}, UsersComponent.accessLogin);

router.get('/', UsersComponent.findAll);

router.get('/:id', UsersComponent.findOne);

router.put('/:id', UsersComponent.update);

router.delete('/:id', UsersComponent.deleteUser);

module.exports = router;
