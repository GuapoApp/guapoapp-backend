const express = require('express')
const router = express.Router()
const auth = require('../middlewares/userAuth')
const Users = require('../models/users-models')

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await Users.findOne({ email: email })
      if (!user || !(await Users.isValidPassword(password, user.password))) {
        res.status(401).send({ message: 'invalid password' })
      } else {
        let { authorization } = req.headers
        const token = await Users.createToken({ _id: user._id, first_name: user.first_name })
        authorization = `Bearer ${token}`
        res.status(201).send({ message: 'login succesful', data: { token: token, userId: user._id } })
      }
    } catch (error) {
      res.status(400).send({ message: error })
    }
  })
  
  
  
  router.post('/', async (req, res) => {
    try {
      let user = req.body
      user.Password = await Users.encryptPassword(user.Password)
      const newUser = await Users.create(user)
      await newUser.save()
      res.status(201).send({ message:'Success', data: user })
    } catch (error) {
        console.log(error)
      res.status(400).send({ message: error })
    }
  })
  
  router.get('/', async (req, res) => {
    try {
      const users = await Users.find()
      res.status(200).send({ message: users })
    } catch (error) {
      res.status(400).send({ message: error })
    }
  })

  module.exports = router