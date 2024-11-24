const mongoose = require('mongoose')
const Consultants = require('../models/consultants-models')
const { createUser } = require('./users-useCases')

const createConsultant = async (consultant) => {
  try {
    const user = await createUser(consultant)
    console.log(user)
    consultant.User = new mongoose.Types.ObjectId(user._id)
    const newConsultant = await Consultants.create(consultant)
    return newConsultant
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createConsultant
}
