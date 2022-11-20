const UserModel = require('../../models/user-model')
const UserDto = require('./dtos/user-dto')

async function findAll() {
    return UserModel.find();
}
async function findOne({id}) {
    const user = await UserModel.findOne({_id: id});
    return new UserDto(user);
}
async function create({email, firstName, lastName}) {
    const user = await UserModel.create({email, firstName, lastName});
    return new UserDto(user);
}
async function update({id}, newData) {
    const user = await UserModel.findOneAndUpdate({_id: id}, newData, {
        new: true
    })
    return new UserDto(user);
}
async function deleteUser({id}) {
    const user = await UserModel.deleteOne({_id: id})
    return user.deletedCount;
}

/**
 *  Leave create service method for future, when we will connect mongo,
 *  we will do manipulations here
 */
/*function create() {
    return {
        message: 'Created',
    };
}*/

module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteUser,
};
