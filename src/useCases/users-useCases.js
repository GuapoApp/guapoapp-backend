const Users = require('../models/users-models')

const createUser = async (user) => {
  try {
    user.Password = await Users.encryptPassword(user.Password)
    const newUser = await Users.create(user)
    await newUser.save()
    return newUser
  } catch (error) {
    console.log(error)
  }
}

const findAll = async () => {
  return await Users.find()
}

const login = async (email, password, headers) => {
  try {
    const user = await Users.findOne({ email: email })
    if (!user || !(await Users.isValidPassword(password, user.password))) {
      res.status(401).send({ message: 'invalid password' })
    } else {
      let { authorization } = headers
      const token = await Users.createToken({
        _id: user._id,
        first_name: user.first_name
      })
      authorization = `Bearer ${token}`
    }
  } catch (error) {}
}

module.exports = {
  findAll,
  createUser
}
