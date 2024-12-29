const Reviews = require('../models/reviews-models')
// Create Reviews

async function createReview(data) {
  try {
    const newReviews = await Reviews.create(data)
    return newReviews
  } catch (error) {
    throw error
  }
}
// Get all Reviews
async function getAll() {
  try {
    const allReviews = await Reviews.find().populate('Consultants')
    return allReviews
  } catch (error) {
    throw error
  }
}
// Get Reviews by id
async function getById(id) {
  try {
    const idReviews = await Reviews.findById(id).populate('Consultants')
    return idReviews
  } catch (error) {
    throw error
  }
}
// Update Reviews

async function updateById(id, newData) {
  try {
    const updatedReviews = await Reviews.findByIdAndUpdate(id, newData, {
      new: true
    })
    return updatedReviews
  } catch (error) {
    throw error
  }
}

module.exports = {
  createReview,
  getAll,
  getById,
  updateById
}
