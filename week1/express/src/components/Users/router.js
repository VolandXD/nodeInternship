const { Router } = require('express');
const UsersComponent = require('./index');

const router = Router();

router.post('/users', UsersComponent.create);

router.get('/users', UsersComponent.findOne);

router.put('/users/:id', UsersComponent.update);

router.delete('/users/:id', UsersComponent.deleteUser);

module.exports = router;
