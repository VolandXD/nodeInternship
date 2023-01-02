const jwt = require('jsonwebtoken');
const tokenModel = require('./token-model');

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

module.exports = {
    generateTokens,
    saveToken,
    validateAccessToken,
};
