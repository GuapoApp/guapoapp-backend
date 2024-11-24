const Professionals = require('../models/profesionals-models')
const createError = require('http-errors')
const express = require('express')
const router = express.Router()

// -----------> CRUD operations<-----------

// Create new mentor
router.post('/', async (req, res) => {
  try {
    const professionalData = req.body
    const newProfessional = await Professionals.create(professionalData)
    await newProfessional.save()

    res.json({
      success: true,
      message: 'Created professional',
      data: { Professional: newProfessional }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })
  }
})

// Get all professionals
router.get('/', async (req, res) => {
  try {
    const professionals = await Professionals.find({})
    res.json({
      success: true,
      message: 'Get all professionals',
      data: { professionals }
    })
  } catch (error) {
    res.status(400),
      res.json({
        success: false,
        message: error.message
      })
  }
})

// Get one professional

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const professional = await Professionals.findById(id)
    if (!professional) {
      throw createError(404, 'Professional not found')
    }
    res.json({
      success: true,
      message: 'Get one professional',
      data: { professional }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })
  }
})

// Update one professional

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const profesionalsData = req.body
    const profesionalsFound = await Professionals.findById(id)
    if (!profesionalsFound) {
      throw createError(404, 'Professional not found')
    }
    professionalUpdate = await Professionals.findByIdAndUpdate(
      id,
      profesionalsData,
      { new: true }
    )
    res.json({
      success: true,
      message: 'Update one professional',
      data: { professionalUpdate }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
