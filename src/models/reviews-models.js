const mongoose = require('mongoose')

const reviewsSchema = new mongoose.Schema({
  Score: {
    type: Number,
    required: true
  },
  Reviews: {
    type: String,
    required: true
  },
  Professional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professionals'
  },
  Consultants: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultants'
  }
})

const reviewsModel = mongoose.model('Reviews', reviewsSchema)
module.exports = reviewsModel //export the model to use in other files.  //export