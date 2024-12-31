const {
  createBankAccount,
  findAll,
  findBankAccount
} = require('../useCases/bankAccounts-useCases')
const { validUser, validAdminUser } = require('../middlewares/userAuth')

const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()

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

router.get('/', validAdminUser, async (req, res) => {
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

router.get('/:id', validUser, async (req, res) => {
  try {
    const { authorization } = req.headers
    const bankAccountId = req.params.id
    const decoded = jwt.verify(
      authorization.split(' ')[1],
      process.env.JWT_SIGN
    )
    const userId = decoded._id

    const bankAccount = await findBankAccount(bankAccountId)

    if (bankAccount.User._id.toString() !== userId) {
      res.status(403).send({
        status: 'Forbidden User',
        data: null,
        error: null
      })

      return
    }

    res.status(200).send({
      status: 'Bank Account Found',
      data: bankAccount,
      error: null
    })
  } catch (error) {
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
