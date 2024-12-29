const express = require('express')
const router = express.Router()
const { validUser } = require('../middlewares/userAuth')
const {
  createConsultant,
  findAll,
  findConsultant
} = require('../useCases/consultants-useCases')

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
      status: 'Error in Post Consultant',
      data: null,
      error: {
        error_message: errorInfo
      }
    })
  }
})

router.get('/', async (req, res) => {
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

router.get('/:id', validUser, async (req, res) => {
  try {
    const consultantId = req.params.id
    const consultant = await findConsultant(consultantId)
    res.status(200).send({
      status: 'OK',
      data: consultant,
      error: null
    })
  } catch (error) {
    // console.log(error)
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
