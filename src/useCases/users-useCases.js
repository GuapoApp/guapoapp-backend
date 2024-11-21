const Users = require('../models/users-models')

const findAll = async() => {
    return await Users.find();
}

const createUser = async(user) => {
    try {
        user.Password = await Users.encryptPassword(user.Password)
        const newUser = await Users.create(user)
        await newUser.save()
        return newUser;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    findAll, 
    createUser
}