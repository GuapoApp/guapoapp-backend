require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoDB = require('./src/db/dbConn')
const user = require('./src/routes/users-routes')
const professional = require('./src/routes/professionals-routes')
const consultant = require('./src/routes/consultants-routes')

app.use(express.json())

app.use(cors())

app.use('/user', user);
app.use('/professional', professional)
app.use('/consultant', consultant)

app.get('/', (req, res) => {
  res.status(200).send('Hey there!')
})

mongoDB.connect
  .then((message) => {
    console.log(message)
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on ${process.env.PORT} port.`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
