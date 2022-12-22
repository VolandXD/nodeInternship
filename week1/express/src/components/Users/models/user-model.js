const bcrypt = require('bcrypt');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    password: { type: String, required: true },
});

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
    if (this.password && this.isModified('password')) {
        const salt = await bcrypt.genSaltSync(10);

        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});
// eslint-disable-next-line func-names
UserSchema.pre('findOneAndUpdate', async function (next) {
    // eslint-disable-next-line no-underscore-dangle
    if (!this._update.password) {
        return next();
    }
    const salt = await bcrypt.genSaltSync(10);

    // eslint-disable-next-line no-underscore-dangle
    this._update.password = await bcrypt.hash(this._update.password, salt);

    return next();
});
module.exports = model('User', UserSchema);
