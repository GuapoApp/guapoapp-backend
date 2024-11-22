const express = require('express')
const router = express.Router()
const auth = require('../middlewares/userAuth')
const { findAll, createUser } = require('../useCases/users-useCases')
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
        first_name: user.first_name
      })
      authorization = `Bearer ${token}`
      res.status(201).send({
        status: 'OK',
        data: { token: token, userId: user._id },
        error: null
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: error })
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

module.exports = router
