const BankAccounts = require('../models/bankAccounts-models')
const mongoose = require('mongoose')

const createBankAccount = async (bankAccount) => {
  try {
    bankAccount.Bank = new mongoose.Types.ObjectId(bankAccount.Bank)
    bankAccount.User = new mongoose.Types.ObjectId(bankAccount.User)

    const newBankAccount = await BankAccounts.create(bankAccount)
    await newBankAccount.save()
    return newBankAccount
  } catch (error) {
    console.log(error)
  }
}

const findAll = async () => {
  return await BankAccounts.find().populate('User').populate('Bank').exec()
}

const findBankAccount = async (id) => {
  return await BankAccounts.findById(id)
    .populate('User')
    .populate('Bank')
    .exec()
}

module.exports = {
  findAll,
  createBankAccount,
  findBankAccount
}
