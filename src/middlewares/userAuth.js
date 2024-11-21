const Users = require('../models/users-models')
const jwt = require('jsonwebtoken')

const validUser = async (req, res, next) => {
  const { authorization } = req.headers
  const token = authorization.split(' ')[1] 
  try {
    const decoded = jwt.verify(token, process.env.JWT_SIGN)
    const date = Math.floor(new Date().getTime() / 1000)
    if (decoded.exp < date) {
      res.status(401).send({ message: 'session expired' })
    } else {
      req.user = decoded
      next()
    }
  } catch (error) {
    res.status(401).send('Login is required')
  }
}

module.exports = {
  validUser
}
