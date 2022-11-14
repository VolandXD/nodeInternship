module.exports = class UserDto {
    email;
    _id;
    firstName;
    lastName;

    constructor(model) {
        this.email = model.email;
        this._id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}