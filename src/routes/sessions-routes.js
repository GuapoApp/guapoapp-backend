const Sessionss = require('../useCases/sessions-useCases')
const createError = require('http-errors')
const express = require('express')
const router = express.Router()

// -----------> CRUD operations<-----------

// Create new mentor
router.post('/', async (req, res) => {
  try {
    const SessionsData = req.body
    const newSessions = await Sessionss.create(SessionsData)
    await newSessions.save()

    res.json({
      success: true,
      message: 'Created sessions',
      data: { Sessionss: newSessions }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })
  }
})

// Get all sessions

router.get('/', async (req, res) => {
  try {
    const sessionss = await Sessionss.getAll({})
    res.json({
      success: true,
      message: 'Get all sessions',
      data: { sessionss }
    })
  } catch (error) {
    res.status(400),
      res.json({
        success: false,
        message: error.message
      })
  }
})

// Get one sessions 

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sessions = await Sessionss.getById(id)
    if (!sessions) {
      throw createError(404, 'Sessions not found')
    }
    res.json({
      success: true,
      message: 'Get one sessions',
      data: { sessions }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })
  }
})

// Update one sessions 

router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const sessionsData = req.body
    const sessionsFound = await Sessions.getById(id)
    if (!sessionsFound) {
      throw createError(404, 'Sessions not found')
    }
    const sessionsUpdate = await Sessions.updateById(
      id,
      sessionsData,{new:true}
    )
    res.json({
      success: true,
      message: 'Update one sessions',
      data: { sessionsUpdate }
    })
  } catch (error) {
    res.status(400)
    res.json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router
