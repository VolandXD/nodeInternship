const { Router } = require('express');
const UsersComponent = require('./index');
const UsersValidation = require('./validate');

const router = Router();

router.post('/', (req, res, next) => {
    UsersValidation.validationFields(req.body, res, next);
}, UsersComponent.create);

router.get('/', UsersComponent.findAll);

router.get('/:id', UsersComponent.findOne);

router.put('/:id', (req, res, next) => {
    UsersValidation.validationFields(req.body, res, next);
}, UsersComponent.update);

router.delete('/:id', UsersComponent.deleteUser);

module.exports = router;
