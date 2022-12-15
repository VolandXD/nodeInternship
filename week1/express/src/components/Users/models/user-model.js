const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, unique: false, required: true },
    lastName: { type: String, unique: false, required: false },
    password: { type: String, unique: false, required: true },
});

module.exports = model('User', UserSchema);
