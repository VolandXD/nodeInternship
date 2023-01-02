const TasksModel = require('./model');
const UsersModel = require('../Users/models/user-model');
const TokenService = require('../Token/service');
const ApiError = require('../../exeptions/api-error');

async function findAll(userId) {
    //mongoId
    return UsersModel.aggregate([
        { $lookup :
                {
                    'from': 'tasks',
                    'localField': '_id',
                    'foreignField': 'assignee',
                    'as': 'tasks'
                },

},
        //{ $match : { assignee : {ObjectId: userId} } },
        { $sort : { estimateTime: -1 }  },
        {
            //$projects
            $addFields:
                {
                    //name: { day: { $dayOfYear: "$date"}, year: { $year: "$date" } },
                    totalAmount: { $sum: "$estimatedTime" },
                }
        },
    ])
}
async function taskPagination(params, userId) {
    const tasks = await TasksModel.find({ assignee: userId}).limit(+params.query.limit).skip(+params.query.limit * +params.query.page);
    const totalTasks = await TasksModel.find({ assignee: userId}).estimatedDocumentCount();
    if (!tasks) {
        throw ApiError.BadRequest('User not found');
    }

    return {
        tasks,
        totalTasks
    };
}
async function create(data, accessToken) {
    //decode
    const validateToken = await TokenService.validateAccessToken(accessToken);

    if (!validateToken) {
        throw ApiError.BadRequest('User has not access');
    }
    const prepeareData = {
        ...data,
        assignee: JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString())._id
    }

    return TasksModel.create(prepeareData);
}
async function update({ id }, newData) {
    return TasksModel.findOneAndUpdate({_id: id},
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
