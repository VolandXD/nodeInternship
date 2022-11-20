const { Router } = require('express');
const UsersComponent = require('./index');

const router = Router();

router.post('/', UsersComponent.create);

router.post('/sign-in', UsersComponent.create);

router.get('/', UsersComponent.findAll);

router.get('/:id', UsersComponent.findOne);

router.get('/account', UsersComponent.findOne);

router.put('/:id', UsersComponent.update);

router.delete('/:id', UsersComponent.deleteUser);

module.exports = router;
