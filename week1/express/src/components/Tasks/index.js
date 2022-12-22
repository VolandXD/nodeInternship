const TasksService = require('./service');

async function findAll(req, res) {
    try {
        const users = await TasksService.findAll();

        return res.status(200).json({
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function findOne(req, res) {
    try {
        const user = await TasksService.findOne(req.params);

        return res.status(200).json({
            data: user,
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
        const user = await TasksService.create(req.body);

        return res.status(201).json({
            data: user,
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
        const user = await TasksService.update(req.params, req.body);

        return res.status(201).json({
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function deleteUser(req, res) {
    try {
        const count = await TasksService.deleteUser(req.params);

        return res.status(201).json({
            data: count,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function signIn(req, res) {
    try {
        const user = await TasksService.findOne(req.body.email);

        // eslint-disable-next-line no-underscore-dangle
        const tokens = await TasksService.generateTokens({ _id: user._id });

        // eslint-disable-next-line no-underscore-dangle
        await TasksService.saveToken(user._id, tokens.refreshToken);

        return res.status(201).json({
            data: {
                ...user,
                token: tokens.accessToken,
            },
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}
async function accessLogin(req, res) {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const userWithAccess = await TasksService.accessLogin(req.body.email, token);

        return res.status(201).json({
            data: userWithAccess,
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
    findOne,
    create,
    update,
    deleteUser,
    signIn,
    accessLogin,
};
