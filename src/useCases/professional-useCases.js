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
    console.log(error)
  }
}
// Get all professional
async function getAll() {
  const allProfessionals = await Professional.find().populate('User').exec()
  return allProfessionals
}
// Get professional by id
async function getById(id) {
  const idProfessional = await Professional.findById(id).populate('User').exec()
  return idProfessional
}
// Update professional

async function updateById(id, newData) {
  const updatedProfessional = await Professional.findByIdAndUpdate(
    id,
    newData,
    { new: true }
  )
  return updatedProfessional
}

module.exports = {
  create,
  getAll,
  getById,
  updateById
}
