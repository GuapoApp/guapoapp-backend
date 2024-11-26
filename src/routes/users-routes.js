const express = require('express')
const router = express.Router()
const { validUser } = require('../middlewares/userAuth')
const {
  findAll,
  createUser,
  updateUser,
  findUser
} = require('../useCases/users-useCases')
const Users = require('../models/users-models')

router.post('/login', async (req, res) => {
  try {
    /*
    TODO: Move to Use Cases
     */
    // const { email, password } = req.body
    const email = req.body.Email
    const password = req.body.Password
    const user = await Users.findOne({ Email: email })
    if (!user || !(await Users.isValidPassword(password, user.Password))) {
      res.status(401).send({
        status: 'Error',
        data: null,
        error: 'Invalidad Password'
      })
    } else {
      let { authorization } = req.headers
      const token = await Users.createToken({
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
        Role: user.Role
      })
      authorization = `Bearer ${token}`
      res.status(201).send({
        status: 'OK',
        data: { token: token },
        error: null
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

router.post('/', async (req, res) => {
  try {
    let user = req.body
    user = await createUser(user)
    res.status(201).send({ status: 'OK', data: user, error: null })
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await findAll()
    res.status(200).send({ status: 'OK', data: users, error: null })
  } catch (error) {
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

router.get('/:id', validUser, async (req, res) => {
  try {
    const userId = req.params.id
    const user = await findUser(userId)
    res.status(200).send({ status: 'OK', data: user, error: null })
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

router.put('/:id', validUser, async (req, res) => {
  try {
    const userId = req.params.id
    if (req.user._id === userId) {
      const updatedUser = await updateUser(userId, req.body)
      res.status(200).send({ status: 'OK', data: updatedUser, error: null })
    } else {
      res
        .status(401)
        .send({ message: 'Unauthorized User', data: null, error: null })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

module.exports = router
