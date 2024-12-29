const express = require('express')
const router = express.Router()
const { validUser, validAdminUser } = require('../middlewares/userAuth')
const {
  findAll,
  createUser,
  updateUser,
  findUser
} = require('../useCases/users-useCases')
const { getConsultantId } = require('../useCases/consultants-useCases')
const { getProfessionalId } = require('../useCases/professional-useCases')
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
        status: 'Invalid credentials',
        data: null,
        error: null
      })
    } else {
      let { authorization } = req.headers
      const token = await Users.createToken({
        _id: user._id,
        Name: user.Name,
        Email: user.Email,
        Role: user.Role,
        Profile_Picture: user.Profile_Picture
      })

      authorization = `Bearer ${token}`
      res.status(200).send({
        status: 'Correct Login',
        data: { token: token },
        error: null
      })
    }
  } catch (error) {
    // console.log(error)
    res.status(400).send({
      status: 'Error in Login',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.post('/', async (req, res) => {
  try {
    let user = req.body
    user = await createUser(user)
    res.status(200).send({
      status: 'Post User Success',
      data: user,
      error: null
    })
  } catch (error) {
    // console.log('Error ==>', error.errors?.Birth_Date.properties.type)

    let errorInfo = error

    // Duplicate Email Error
    if (error.errorResponse?.code === 11000) {
      errorInfo = {
        code: error.errorResponse.code,
        message: 'Email already exists'
      }
    }

    res.status(400).send({
      status: 'Error in Post User',
      data: null,
      error: {
        error_message: errorInfo
      }
    })
  }
})

router.get('/', validAdminUser, async (req, res) => {
  try {
    const users = await findAll()
    res.status(200).send({
      status: 'Users Found',
      data: users,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Users',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.get('/:id', validUser, async (req, res) => {
  try {
    const userId = req.params.id

    if (req.user._id !== userId) {
      res.status(403).send({
        status: 'Forbidden User',
        data: null,
        error: null
      })

      return
    }

    const foundUser = await findUser(userId)
    let professionalId = null
    let consultantId = null

    professionalId = await getProfessionalId(userId)
    consultantId = await getConsultantId(userId)

    professionalId = professionalId.length > 0 ? professionalId[0]._id : null
    consultantId = consultantId.length > 0 ? consultantId[0]._id : null

    const user = {
      ...foundUser.toObject(),
      Professional_Id: professionalId,
      Consultant_Id: consultantId
    }

    res.status(200).send({
      status: 'User Found',
      data: user,
      error: null
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'Error in Get User by ID',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.put('/:id', validUser, async (req, res) => {
  try {
    const userId = req.params.id
    if (req.user._id === userId) {
      const updatedUser = await updateUser(userId, req.body)
      res.status(200).send({
        status: 'User updated',
        data: updatedUser,
        error: null
      })
    } else {
      res.status(403).send({
        message: 'Forbidden User',
        data: null,
        error: null
      })
    }
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'Error in Update User',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

module.exports = router
