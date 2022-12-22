const UsersService = require('./service');

async function findAll(req, res) {
    try {
        const users = await UsersService.findAll();

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
        const user = await UsersService.findOne(req.params);

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
        const user = await UsersService.create(req.body);

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
        const user = await UsersService.update(req.params, req.body);

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
        const count = await UsersService.deleteUser(req.params);

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
module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteUser,
};
