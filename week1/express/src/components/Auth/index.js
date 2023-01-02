const AuthService = require('./service');
const UsersService = require('../Users/service');
const TokenService = require('../Token/service');

async function signIn(req, res) {
    try {
        const user = await UsersService.findOne(req.body.email);
        // eslint-disable-next-line no-underscore-dangle
        const tokens = await TokenService.generateTokens({ _id: user._id });

        // eslint-disable-next-line no-underscore-dangle
        await TokenService.saveToken(user._id, tokens.refreshToken);

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
        const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'].split(' ')[1];
        const userWithAccess = await AuthService.accessLogin(req.body.email, token);

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
    signIn,
    accessLogin,
};
