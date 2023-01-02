// eslint-disable-next-line import/no-extraneous-dependencies,camelcase
const jwt_decode = require('jwt-decode');
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;
const TasksModel = require('./model');
const UsersModel = require('../Users/models/user-model');
const TokenService = require('../Token/service');
const ApiError = require('../../exeptions/api-error');

async function findAll(userId) {
    // mongoId

    return UsersModel.aggregate([
        { $match: { _id: new ObjectId(userId) } },
        {
            $lookup:
                {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'assignee',
                    as: 'tasks',
                },
        },
        {
            $project: {
                _id: 1,
                email: 1,
                firstName: 1,
                lastName: 1,
                password: 1,
                tasks: {
                    $sortArray: { input: '$tasks', sortBy: { estimateTime: -1 } },
                },
                totalTasks: { $cond: { if: { $isArray: '$tasks' }, then: { $size: '$tasks' }, else: 'N/A' } },
                totalEstimation: { $sum: { $sum: '$tasks.estimateTime' } },
                name: { $concat: ['$firstName', ' ', '$lastName'] },
            },
        },
    ]);
}
async function taskPagination(params, userId) {
    const tasks = await TasksModel.find({ assignee: userId }).limit(+params.query.limit).skip(+params.query.limit * +params.query.page);
    const totalTasks = await TasksModel.find({ assignee: userId }).estimatedDocumentCount();

    if (!tasks) {
        throw ApiError.BadRequest('Tasks not found');
    }

    return {
        tasks,
        totalTasks,
    };
}
async function create(data, accessToken) {
    // decode
    const validateToken = await TokenService.validateAccessToken(accessToken);

    if (!validateToken) {
        throw ApiError.BadRequest('User has not access');
    }
    const prepeareData = {
        ...data,
        assignee: jwt_decode(accessToken)._id,
    };

    return TasksModel.create(prepeareData);
}
async function update({ id }, newData) {
    return TasksModel.findOneAndUpdate({ _id: id },
        { estimateTime: newData.estimateTime }, {
            new: true,
        });
}

module.exports = {
    create,
    findAll,
    taskPagination,
    update,
};
