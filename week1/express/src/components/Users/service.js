const jwt = require('jsonwebtoken');
const UserModel = require('./models/user-model');
// const UserDto = require('./dtos/user-dto')
const tokenModel = require('./models/token-model');
const ApiError = require('../../exeptions/api-error');

async function findAll() {
    return UserModel.find();
}
async function findOne(params) {
    const user = await UserModel.findOne(params.id ? { _id: params.id } : { email: params });

    if (!user) {
        throw ApiError.BadRequest('Користувач не знайдений');
    }

    return user;
}
function create({ email, firstName, lastName }) {
    return UserModel.create({ email, firstName, lastName });
}
async function update({ id }, newData) {
    return UserModel.findOneAndUpdate({ _id: id }, newData, {
        new: true,
    });
}
async function deleteUser({ id }) {
    const user = await UserModel.deleteOne({ _id: id });

    return user.deletedCount;
}

async function generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCSESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return {
        accessToken,
        refreshToken,
    };
}
async function saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });

    if (tokenData) {
        tokenData.refreshToken = refreshToken;

        return tokenData.save();
    }

    return tokenModel.create({ user: userId, refreshToken });
}
function validateAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCSESS_SECRET);
    } catch (e) {
        return null;
    }
}
async function accessLogin(email, accessToken) {
    const validateToken = await validateAccessToken(accessToken);

    if (!validateToken) {
        throw ApiError.BadRequest('Користувач не має доступу');
    }

    return findOne(email);
}
/**
 *  Leave create service method for future, when we will connect mongo,
 *  we will do manipulations here
 */
/* function create() {
    return {
        message: 'Created',
    };
} */

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteUser,
    generateTokens,
    saveToken,
    accessLogin,
};
