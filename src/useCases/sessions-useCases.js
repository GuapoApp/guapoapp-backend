const { model } = require('mongoose')
const Sessions = require('../models/sessions-models')

// Create sessions

async function createSession(data) {
  try {
    const newSessions = await Sessions.create(data)
    return newSessions
  } catch (error) {
    throw error
  }
}
// Get all sessions
async function getAll() {
  try {
    const allSessions = await Sessions.find()
      .populate({
        path: 'Professional',
        populate: 'User'
      })
      .populate({
        path: 'Consultant',
        populate: 'User'
      })
      .exec()
    return allSessions
  } catch (error) {
    throw error
  }
}
// Get sessions by id
async function getById(id) {
  try {
    const idSessions = await Sessions.findById(id)
      .populate({
        path: 'Professional',
        populate: 'User'
      })
      .populate({
        path: 'Consultant',
        populate: 'User'
      })
      .exec()
    return idSessions
  } catch (error) {
    throw error
  }
}
// Update sessions

async function updateById(id, newData) {
  try {
    const updatedSessions = await Sessions.findByIdAndUpdate(id, newData, {
      new: true
    })
    return updatedSessions
  } catch (error) {
    throw error
  }
}

module.exports = {
  createSession,
  getAll,
  getById,
  updateById
}
