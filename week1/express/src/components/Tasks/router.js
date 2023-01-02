const { Router } = require('express');
const TasksComponent = require('./index');
const taskSchema = require('./validate');

const router = Router();

router.post('/', (req, res, next) => {
    taskSchema.validationFields(req.body, res, next);
}, TasksComponent.create);

router.get('/tasks/all', TasksComponent.findAll);

router.get('/', TasksComponent.taskPagination);

router.patch('/:id', (req, res, next) => {
    taskSchema.validationUpdateFields(req.body, res, next);
}, TasksComponent.update);

module.exports = router;
