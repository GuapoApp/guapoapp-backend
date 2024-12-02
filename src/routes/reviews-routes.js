const Reviews = require('../useCases/reviews-useCases')
const createError = require('http-errors')
const express = require('express')
const router = express.Router()

// -----------> CRUD operations<-----------

// Create new mentor
router.post('/', async (req, res) => {
  try {
    const reviewsData = req.body
    const newreviews = await Reviews.create(reviewsData)
    await newreviews.save()
    
    res.status(201).send({status:"OK", data:newreviews, error:null})
    
  } catch (error) {
    res.status(400).send({status:"Error", data:null, error:error })
  }
})

// Get all Reviews
router.get('/', async (req,res)=>{
    try {
        const reviews = await Reviews.getAll({})
        res.status(201).send({status:"OK", data:reviews, error:null})
        
        
    } catch (error) {
        res.status(400),
        res.json({
            success:false,
            message:error.message,
        })   
    }
})

// Get one reviews

router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const reviews = await Reviews.getById(id)
        if(!reviews){
            throw createError(404, "reviews not found");
        }
        res.json({
            success:true,
            message:"Get one reviews",
            data:{reviews}
        });
    } catch (error) {
        res.status(400);
        res.json({
            success:false,
            message:error.message,
        })
    }
})

// Update one reviews

router.patch('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const profesionalsData = req.body;
        const profesionalsFound = await Reviews.getById(id);
        if(!profesionalsFound){
            throw createError(404, "reviews not found");
            }
            reviewsUpdate = await Reviews.updateById(id, profesionalsData, {new:true});
            res.json({
                success:true,
                message: "Update one reviews",
                data:{reviewsUpdate}
            })
                
    } catch (error) {
        res.status(400)
        res.json({
            success:false,
            message:error.message,            
        });
    }
})

module.exports = router
