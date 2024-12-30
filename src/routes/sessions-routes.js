const {
  createSession,
  getAll,
  getById,
  updateById
} = require('../useCases/sessions-useCases')
const { validUser, validAdminUser } = require('../middlewares/userAuth')
const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// -----------> CRUD operations<-----------

// Create new session
router.post('/', async (req, res) => {
  try {
    const sessionData = req.body
    const newSession = await createSession(sessionData)
    await newSession.save()

    res.status(201).send({
      status: 'Sessions created',
      data: newSession,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Post Sessions',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Get all sessions

router.get('/', validAdminUser, async (req, res) => {
  try {
    const sessions = await getAll({})
    res.status(200).send({
      status: 'Sessions Found',
      data: sessions,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Sessions',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Get one sessions

router.get('/:id', validUser, async (req, res) => {
  try {
    const id = req.params.id
    const { authorization } = req.headers
    const decoded = jwt.verify(
      authorization.split(' ')[1],
      process.env.JWT_SIGN
    )
    const userId = decoded._id

    const session = await getById(id)

    if (
      session.Professional.User._id.toString() !== userId &&
      session.Consultant.User._id.toString() !== userId
    ) {
      res.status(403).send({
        status: 'Forbidden User',
        data: null,
        error: null
      })

      return
    }

    // if (!sessions) {
    //   throw createError(404, 'Sessions not found')
    // }
    res.status(200).send({
      status: 'Session Found',
      data: session,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Session by Id',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Update one sessions

// router.patch('/:id', async (req, res) => {
//   try {
//     const id = req.params.id
//     const sessionsData = req.body
//     const sessionsFound = await Sessions.getById(id)
//     if (!sessionsFound) {
//       throw createError(404, 'Sessions not found')
//     }
//     const sessionsUpdate = await Sessions.updateById(id, sessionsData, {
//       new: true
//     })
//     res.json({
//       success: true,
//       message: 'Update one sessions',
//       data: { sessionsUpdate }
//     })
//   } catch (error) {
//     res.status(400)
//     res.json({
//       success: false,
//       message: error.message
//     })
//   }
// })

module.exports = router
