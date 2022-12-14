const UserModel = require('./models/user-model');
// const UserDto = require('./dtos/user-dto')
const TokenService = require('../Token/service');
const ApiError = require('../../exeptions/api-error');

async function findAll() {
    return UserModel.find();
}
async function findOne(params) {
    const user = await UserModel.findOne(params.id ? { _id: params.id } : { email: params });

    if (!user) {
        throw ApiError.BadRequest('User not found');
    }

    return user;
}
async function create(data) {
    const user = await UserModel.create(data);
    // eslint-disable-next-line no-underscore-dangle
    const tokens = await TokenService.generateTokens(user);

    // eslint-disable-next-line no-underscore-dangle
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return user;
}
async function update({ id }, newData) {
    const user = await UserModel.findOneAndUpdate({ _id: id },
        newData, {
            new: true,
        });

    const tokens = await TokenService.generateTokens(user);

    // eslint-disable-next-line no-underscore-dangle
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return user;
}
async function deleteUser({ id }) {
    const user = await UserModel.deleteOne({ _id: id });

    return user.deletedCount;
}

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteUser,
};
