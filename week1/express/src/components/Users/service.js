const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('./models/user-model');
// const UserDto = require('./dtos/user-dto')
const tokenModel = require('./models/token-model');
const ApiError = require('../../exeptions/api-error');

async function findAll() {
    return UserModel.find();
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
async function findOne(params) {
    const user = await UserModel.findOne(params.id ? { _id: params.id } : { email: params });

    if (!user) {
        throw ApiError.BadRequest('User not found');
    }

    return user;
}
async function create({
    email, firstName, lastName, password,
}) {
    const hashPassword = await bcrypt.hash(password, 3);
    const tokens = await generateTokens({ password: hashPassword });
    const user = await UserModel.create({
        email, firstName, lastName, password: hashPassword,
    });

    // eslint-disable-next-line no-underscore-dangle
    await saveToken(user._id, tokens.refreshToken);

    return user;
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
