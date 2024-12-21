const banks = require('../models/banks-models')

const findByBankCode = async (bankCode) => {
  try {
    return await banks.findOne({ Bank_Code: bankCode })
  } catch (error) {
    console.log(error)
  }
}

module.exports = { findByBankCode }
