const mongoose = require('mongoose')
const Consultants = require('../models/consultants-models')
const { createUser } = require('./users-useCases')

const createConsultant = async (consultant) => {
  try {
    const user = await createUser(consultant)
    consultant.User = new mongoose.Types.ObjectId(user._id)
    const newConsultant = await Consultants.create(consultant)
    newConsultant.User = user
    return newConsultant
  } catch (error) {
    console.log(error)
    throw error
  }
}

const findAll = async () => {
  return await Consultants.find().populate('User').exec()
}

const findConsultant = async (id) => {
  return await Consultants.findById(id).populate('User').exec()
}

const getConsultantId = async (userId) => {
  try {
    const consultantId = await Consultants.find({ User: userId }).select('_id')
    return consultantId
  } catch (error) {
    throw error
  }
}

const updateConsultant = async (id, data) => {
  try {
    const updatedConsultant = await Consultants.findByIdAndUpdate(id, data, {
      returnOriginal: false
    })
    return updatedConsultant
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createConsultant,
  findAll,
  findConsultant,
  getConsultantId,
  updateConsultant
}
