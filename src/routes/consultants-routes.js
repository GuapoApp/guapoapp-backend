const express = require('express')
const router = express.Router()
const { createConsultant } = require('../useCases/consultants-useCases')
const Consultants = require('../models/consultants-models')

router.post('/', async (req, res) => {
  try {
    let consultant = req.body
    consultant = await createConsultant(consultant)
    res.status(201).send({ status: 'OK', data: consultant, error: null })
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

module.exports = router
