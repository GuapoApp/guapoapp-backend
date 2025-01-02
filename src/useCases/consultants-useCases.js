const mongoose = require('mongoose')
const Consultants = require('../models/consultants-models')
const Sessions = require('../models/sessions-models')
const { createUser } = require('./users-useCases')
const { addMinutes } = require('date-fns')

const createConsultant = async (consultant) => {
  try {
    const user = await createUser(consultant)
    consultant.User = new mongoose.Types.ObjectId(user._id)
    const newConsultant = await Consultants.create(consultant)
    newConsultant.User = user
    return newConsultant
  } catch (error) {
    throw error
  }
}

const findAll = async () => {
  try {
    return await Consultants.find().populate('User').exec()
  } catch (error) {
    throw error
  }
}

const findConsultant = async (id) => {
  try {
    return await Consultants.findById(id).populate('User').exec()
  } catch (error) {
    throw error
  }
}

const getConsultantId = async (userId) => {
  try {
    const consultantId = await Consultants.find({ User: userId }).select('_id')
    return consultantId
  } catch (error) {
    throw error
  }
}

const getAvailableConsultants = async (scheduledDate, startHour) => {
  try {
    let availableConsultants = []

    // Get Consultants
    const consultants = await Consultants.find().select('_id')

    // Get Sessions with date time + 59 mins
    const hour = parseInt(startHour.substring(0, 2))
    const minutes = parseInt(startHour.substring(3, 5))
    const year = parseInt(scheduledDate.substring(0, 4))
    const month = parseInt(scheduledDate.substring(5, 7))
    const day = parseInt(scheduledDate.substring(8, 10))

    const startDateTime = new Date(year, month - 1, day, hour, minutes)

    const finishDateTime = addMinutes(startDateTime, 59)

    // Get the consultants from the sessions above

    const busyConsultants = await Sessions.find({
      Date: { $gte: startDateTime, $lt: finishDateTime },
      Status: 'Scheduled'
    }).distinct('Consultant')

    // Delete the consultants from the sessions above in the consultants list
    const filteredConsultants = consultants.filter(
      (consultant) => !busyConsultants.some((id) => id.equals(consultant.id))
    )

    if (filteredConsultants.length === 0) {
      return availableConsultants
    }

    availableConsultants = await Consultants.find({
      _id: { $in: filteredConsultants }
    })
      .populate({ path: 'User', select: 'Name Profile_Picture' })
      .exec()

    return availableConsultants
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
    throw error
  }
}

module.exports = {
  createConsultant,
  findAll,
  findConsultant,
  getConsultantId,
  getAvailableConsultants,
  updateConsultant
}
