const Users = require('../models/users-models')
const jwt = require('jsonwebtoken')

const validUser = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SIGN)
    const date = Math.floor(new Date().getTime() / 1000)
    if (decoded.exp < date) {
      res.status(401).send({
        status: 'Session Expired',
        data: null,
        error: null
      })
    } else {
      req.user = decoded
      next()
    }
  } catch (error) {
    res.status(401).send({
      status: 'Login is required',
      data: null,
      error: null
    })
  }
}

const validAdminUser = async (req, res, next) => {
  const { authorization } = req.headers
  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SIGN)
    const date = Math.floor(new Date().getTime() / 1000)
    if (decoded.exp < date) {
      res.status(401).send({
        status: 'Session Expired',
        data: null,
        error: null
      })
    } else {
      if (decoded.Role !== 'ADMIN') {
        res.status(401).send({
          status: 'Admin Role is required',
          data: null,
          error: null
        })

        return
      }

      req.user = decoded
      next()
    }
  } catch (error) {
    res.status(401).send({
      status: 'Login is required',
      data: null,
      error: null
    })
  }
}

module.exports = {
  validUser,
  validAdminUser
}
