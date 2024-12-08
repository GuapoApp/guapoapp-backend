const BankAccounts = require('../models/bankAccounts-models')

const createBankAccount = async (bankAccount) => {
  try {
    const newBankAccount = await BankAccounts.create(bankAccount)
    await newBankAccount.save()
    return newBankAccount
  } catch (error) {
    console.log(error)
  }
}

const findAll = async () => {
  return await BankAccounts.find()
}

const findBankAccount = async (id) => {
  return await BankAccounts.findById(id)
}

module.exports = {
  findAll,
  createBankAccount,
  findBankAccount
}
