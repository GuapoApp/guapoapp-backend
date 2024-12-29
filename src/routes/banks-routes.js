const express = require('express')
const router = express.Router()
const { findByBankCode } = require('../useCases/banks-useCases')

router.get('/:bankCode', async (req, res) => {
  try {
    const bankCode = req.params.bankCode
    const bank = await findByBankCode(bankCode)
    res.status(200).send({
      status: 'Bank Found',
      data: bank,
      error: null
    })
  } catch (error) {
    // console.log(error)
    res.status(400).send({
      status: 'Error in Get Bank by Bank Code',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

module.exports = router
