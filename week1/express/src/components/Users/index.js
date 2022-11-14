const UsersService = require('./service');

async function findOne(req, res) {
    try {
        const demo = await UsersService.findOne();

        return res.status(200).json({
            data: demo,
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
        const demo = await UsersService.create(req.body);

        return res.status(201).json({
            data: demo,
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
        const demo = await UsersService.create(req.body);

        return res.status(201).json({
            data: demo,
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
        const demo = await UsersService.create(req.body);

        return res.status(201).json({
            data: demo,
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            details: null,
        });
    }
}

module.exports = {
    findOne,
    create,
    update,
    deleteUser,
};
