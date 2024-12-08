const mongoose = require('mongoose')

const bankAccountSchema = new mongoose.Schema({
  User: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'User is required']
  },
  Clabe_Account: {
    type: String,
    required: true
  },
  Bank: {
    type: mongoose.Types.ObjectId,
    ref: 'Banks'
  },
  Alias: {
    type: String
  }
})

const bankAccountModel = mongoose.model('BankAccount', bankAccountSchema)
module.exports = bankAccountModel
