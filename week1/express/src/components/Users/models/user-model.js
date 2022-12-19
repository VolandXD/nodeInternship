const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    password: { type: String, required: true },
});
UserSchema.pre('save', async function(next) {
    if(this.password && this.isModified('password')) {
        let salt = await bcrypt.genSaltSync(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})
module.exports = model('User', UserSchema);
