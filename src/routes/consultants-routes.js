const express = require('express')
const router = express.Router()
const { validUser, validAdminUser } = require('../middlewares/userAuth')
const {
  createConsultant,
  findAll,
  findConsultant,
  getAvailableConsultants
} = require('../useCases/consultants-useCases')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
  try {
    let consultant = req.body
    consultant = await createConsultant(consultant)
    res.status(201).send({
      status: 'Consultant created',
      data: consultant,
      error: null
    })
  } catch (error) {
    let errorInfo = error

    // Duplicate Email Error
    if (error.errorResponse?.code === 11000) {
      errorInfo = {
        code: error.errorResponse.code,
        message: 'Email already exists'
      }
    }

    res.status(400).send({
      status: 'Error in Post Consultant',
      data: null,
      error: {
        error_message: errorInfo
      }
    })
  }
})

router.get('/', validAdminUser, async (req, res) => {
  try {
    const consultants = await findAll()
    res.status(200).send({
      status: 'Consultants Found',
      data: consultants,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Consultants',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.get('/availability', validUser, async (req, res) => {
  try {
    const availableConsultants = await getAvailableConsultants(
      req.query.date,
      req.query.hour
    )

    if (availableConsultants.length === 0) {
      res.status(404).send({
        status: 'No Consultants Available',
        data: null,
        error: null
      })
      return
    }

    res.status(200).send({
      status: 'Available Consultants Found',
      data: availableConsultants,
      error: null
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      status: 'Error in Get Available Consultants',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.get('/:id', validUser, async (req, res) => {
  try {
    const { authorization } = req.headers
    const consultantId = req.params.id
    const decoded = jwt.verify(
      authorization.split(' ')[1],
      process.env.JWT_SIGN
    )
    const userId = decoded._id

    const consultant = await findConsultant(consultantId)

    if (consultant.User._id.toString() !== userId) {
      res.status(403).send({
        status: 'Forbidden User',
        data: null,
        error: null
      })

      return
    }

    res.status(200).send({
      status: 'Consultant Found',
      data: consultant,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Consultant by Id',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

/*
TODO: Update Consultant
 */

module.exports = router
