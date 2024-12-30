const Professionals = require('../useCases/professional-useCases')
const { validUser, validAdminUser } = require('../middlewares/userAuth')

const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// -----------> CRUD operations<-----------

// Create new professional
router.post('/', async (req, res) => {
  try {
    const professionalData = req.body
    const newProfessional = await Professionals.create(professionalData)
    await newProfessional.save()

    res.status(201).send({
      status: 'Professional created',
      data: newProfessional,
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
      status: 'Error in Post Professional',
      data: null,
      error: {
        error_message: errorInfo
      }
    })
  }
})

// Get all professionals
router.get('/', validAdminUser, async (req, res) => {
  try {
    const professionals = await Professionals.getAll({})
    res.status(200).send({
      status: 'Professionals Found',
      data: {
        professionals
      },
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Professionals',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Get one professional by id
router.get('/:id', validUser, async (req, res) => {
  try {
    const { authorization } = req.headers
    const professionalId = req.params.id
    const decoded = jwt.verify(
      authorization.split(' ')[1],
      process.env.JWT_SIGN
    )
    const userId = decoded._id

    const professional = await Professionals.getById(professionalId)
    // if (!professional) {
    //   throw createError(404, 'Professional not found')
    // }

    if (professional.User._id.toString() !== userId) {
      res.status(403).send({
        status: 'Forbidden User',
        data: null,
        error: null
      })

      return
    }

    res.status(200).send({
      status: 'Professional Found',
      data: professional,
      error: null
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'Error in Get Professional by Id',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Update one professional

// router.patch('/:id', async (req, res) => {
//   try {
//     const id = req.params.id
//     const profesionalsData = req.body
//     const profesionalsFound = await Professionals.getById(id)
//     if (!profesionalsFound) {
//       throw createError(404, 'Professional not found')
//     }
//     const professionalUpdate = await Professionals.updateById(
//       id,
//       profesionalsData
//     )
//     res.json({
//       success: true,
//       message: 'Update one professional',
//       data: { professionalUpdate }
//     })
//   } catch (error) {
//     res.status(400)
//     res.json({
//       success: false,
//       message: error.message
//     })
//   }
// })

module.exports = router
