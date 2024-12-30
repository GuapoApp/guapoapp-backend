const Professional = require('../models/profesionals-models')
const { createUser } = require('./users-useCases')
const mongoose = require('mongoose')

// Create professional

async function create(professional) {
  try {
    const user = await createUser(professional)
    professional.User = new mongoose.Types.ObjectId(user._id)
    const newProfessional = await Professional.create(professional)
    newProfessional.User = user
    return newProfessional
  } catch (error) {
    // console.log(error)
    throw error
  }
}
// Get all professional
async function getAll() {
  try {
    const allProfessionals = await Professional.find().populate('User').exec()
    return allProfessionals
  } catch (error) {
    throw error
  }
}
// Get professional by id
async function getById(id) {
  // console.log('Received Id:', id)
  try {
    const professional = await Professional.findById(id).populate('User').exec()

    return professional
  } catch (error) {
    throw error
  }
}

const getProfessionalId = async (userId) => {
  try {
    const professionalId = await Professional.find({ User: userId }).select(
      '_id'
    )
    return professionalId
  } catch (error) {
    throw error
  }
}
// Update professional

async function updateById(id, newData) {
  try {
    const updatedProfessional = await Professional.findByIdAndUpdate(
      id,
      newData,
      { new: true }
    )
    return updatedProfessional
  } catch (error) {
    throw error
  }
}

module.exports = {
  create,
  getAll,
  getById,
  getProfessionalId,
  updateById
}
