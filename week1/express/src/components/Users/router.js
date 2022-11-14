const { Router } = require('express');
const UsersComponent = require('./index');

const router = Router();

router.post('/', UsersComponent.create);

router.get('/list', UsersComponent.findAll);

router.get('/', UsersComponent.findOne);

router.put('/:id', UsersComponent.update);

router.delete('/:id', UsersComponent.deleteUser);

module.exports = router;
