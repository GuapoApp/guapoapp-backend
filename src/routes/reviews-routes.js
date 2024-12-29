const {
  createReview,
  getAll,
  getById,
  updateById
} = require('../useCases/reviews-useCases')
const createError = require('http-errors')
const express = require('express')
const router = express.Router()

// -----------> CRUD operations<-----------

// Create new review
router.post('/', async (req, res) => {
  try {
    const reviewsData = req.body
    const newReviews = await Reviews.createReview(reviewsData)
    await newReviews.save()

    res.status(201).send({
      status: 'Review created',
      data: newReviews,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Post Review',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Get all Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await getAll()
    res.status(200).send({
      status: 'Reviews Found',
      data: reviews,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Reviews',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Get one reviews

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const reviews = await getById(id)
    // if (!reviews) {
    //   throw createError(404, 'reviews not found')
    // }
    res.status(200).send({
      status: 'Review Found',
      data: reviews,
      error: null
    })
  } catch (error) {
    res.status(400).send({
      status: 'Error in Get Review by Id',
      data: null,
      error: {
        error_message: error
      }
    })
  }
})

// Update one reviews

// router.patch('/:id', async (req, res) => {
//   try {
//     const id = req.params.id
//     const profesionalsData = req.body
//     const profesionalsFound = await Reviews.getById(id)
//     if (!profesionalsFound) {
//       throw createError(404, 'reviews not found')
//     }
//     reviewsUpdate = await Reviews.updateById(id, profesionalsData, {
//       new: true
//     })
//     res.json({
//       success: true,
//       message: 'Update one reviews',
//       data: { reviewsUpdate }
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
