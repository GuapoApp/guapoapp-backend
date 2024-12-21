const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
  Bank_Code: {
    type: String,
    required: true,
    unique: [true, 'Bank code must be unique']
  },
  Bank_Name: {
    type: String,
    required: true
  }
})

const bankModel = mongoose.model('Banks', bankSchema)

module.exports = bankModel
