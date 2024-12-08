const mongoose = require('mongoose')

const bankAccountSchema = new mongoose.Schema({
  User: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: [true, 'User is required']
  },
  Clabe_Account: {
    type: String,
    required: true,
    unique: [true, 'Clabe Account must be unique']
  },
  Bank: {
    type: mongoose.Types.ObjectId,
    ref: 'Banks'
  },
  Alias: {
    type: String
  }
})

const bankAccountModel = mongoose.model('BankAccounts', bankAccountSchema)
module.exports = bankAccountModel
