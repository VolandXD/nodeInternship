const { Router } = require('express');
const TasksComponent = require('./index');
const taskSchema = require('./validate');

const router = Router();

router.post('/', (req, res, next) => {
    taskSchema.validationFields(req.body, res, next);
}, TasksComponent.create);

router.get('/', TasksComponent.findAll);

router.get('/:id', TasksComponent.findOne);

router.put('/:id', (req, res, next) => {
    taskSchema.validationFields(req.body, res, next);
}, TasksComponent.update);

router.delete('/:id', TasksComponent.deleteUser);

module.exports = router;
