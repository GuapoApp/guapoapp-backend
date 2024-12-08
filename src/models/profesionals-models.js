const mongoose = require('mongoose')

const professionalSchema = new mongoose.Schema({
  User: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'User is required']
  },
  About: {
    type: String,
    required: true
  }
})

const professionalModel = mongoose.model('Professional', professionalSchema)
module.exports = professionalModel
