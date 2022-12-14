// eslint-disable-next-line import/no-extraneous-dependencies,camelcase
const jwt_decode = require('jwt-decode');
const TasksService = require('./service');

async function findAll(req, res) {
    try {
        const authToken = req.headers.authorization.split(' ')[1];
        const userId = jwt_decode(authToken)._id;
        const tasks = await TasksService.findAll(userId);

        return res.status(200).json({
            data: tasks,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function taskPagination(req, res) {
    try {
        const authToken = req.headers.authorization.split(' ')[1];
        const userId = jwt_decode(authToken)._id;
        const tasks = await TasksService.taskPagination(req, userId);

        return res.status(200).json({
            data: {
                ...tasks,
            },
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

async function create(req, res) {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
        const task = await TasksService.create(req.body, token);

        return res.status(201).json({
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function update(req, res) {
    try {
        const task = await TasksService.update(req.params, req.body);

        return res.status(201).json({
            data: task,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
module.exports = {
    findAll,
    taskPagination,
    create,
    update,
};
