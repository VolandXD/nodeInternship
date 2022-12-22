const UsersService = require('../Users/service');
const TokenService = require('../Token/service');
const ApiError = require('../../exeptions/api-error');

async function accessLogin(email, accessToken) {
    const validateToken = await TokenService.validateAccessToken(accessToken);

    if (!validateToken) {
        throw ApiError.BadRequest('Користувач не має доступу');
    }

    return UsersService.findOne(email);
}

module.exports = {
    accessLogin,
};
