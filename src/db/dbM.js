const mongoose = require('mongoose')
const URI = 'mongodb+srv://admin:adminGuapoApp@guapoapp.y71a5.mongodb.net/'

const connect = new Promise(async (resolve, reject) => {
  const conn = mongoose.connect(URI)
  if (conn) resolve('Connection succesfully.')
  reject(new Error('Error connection failed'))
})

module.exports = {
  connect
}