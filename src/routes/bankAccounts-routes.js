const express = require('express')
const router = express.Router()
const {
  createBankAccount,
  findAll,
  findBankAccount
} = require('../useCases/bankAccounts-useCases')

router.post('/', async (req, res) => {
  try {
    let bankAccount = req.body
    bankAccount = await createBankAccount(bankAccount)
    res.status(201).send({
      status: 'Bank Account created',
      data: bankAccount,
      error: null
    })
  } catch (error) {
    // console.log(error)
    res.status(400).send({
      status: 'Error',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const bankAccounts = await findAll()
    res.status(200).send({
      status: 'Bank Accounts Found',
      data: bankAccounts,
      error: null
    })
  } catch (error) {
    // console.log(error)
    res.status(400).send({
      status: 'Error in Get Bank Accounts',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const bankAccountId = req.params.id
    const bankAccount = await findBankAccount(bankAccountId)
    res.status(200).send({
      status: 'Bank Account Found',
      data: bankAccount,
      error: null
    })
  } catch (error) {
    // console.log(error)
    res.status(400).send({
      status: 'Error in Get Bank Account by Id',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

module.exports = router
