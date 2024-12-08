const express = require('express')
const router = express.Router()
const {
  createBankAccount,
  findAll,
  findBankAccount
} = require('../useCases/bankAccounts-useCases')

router.post('/', async (req, res) => {
  try {
    const bankAccount = req.body
    bankAccount = await createBankAccount(bankAccount)
    res.status(201).send({ status: 'OK', data: bankAccount, error: null })
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

router.get('/', async (req, res) => {
  try {
    const bankAccounts = await findAll()
    res.status(200).send({ status: 'OK', data: bankAccounts, error: null })
  } catch (error) {
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const bankAccountId = req.params.id
    const bankAccount = await findBankAccount(bankAccountId)
    res.status(200).send({ status: 'OK', data: bankAccount, error: null })
  } catch (error) {
    console.log(error)
    res.status(400).send({ status: 'Error', data: null, error: error })
  }
})

module.exports = router
