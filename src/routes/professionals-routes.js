const Professionals = require('../useCases/professional-useCases')
const createError = require('http-errors')
const express = require('express')
const router = express.Router()

// -----------> CRUD operations<-----------

// Create new mentor
router.post('/', async (req, res) => {
  try {
    const professionalData = req.body
    const newProfessional = await Professionals.create(professionalData)
    await newProfessional.save()
    
    res.status(201).send({status:"OK", data:newProfessional, error:null})
    
  } catch (error) {
    res.status(400).send({status:"Error", data:null, error:error })
  }
})

// Get all professionals
router.get('/', async (req,res)=>{
    try {
        const professionals = await Professionals.getAll({})
        res.status(201).send({status:"OK", data:professionals, error:null})
        
        
    } catch (error) {
        res.status(400),
        res.json({
            success:false,
            message:error.message,
        })   
    }
})

// Get one professional

router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const professional = await Professionals.getById(id)
        if(!professional){
            throw createError(404, "Professional not found");
        }
        res.json({
            success:true,
            message:"Get one professional",
            data:{professional}
        });
    } catch (error) {
        res.status(400);
        res.json({
            success:false,
            message:error.message,
        })
    }
})

// Update one professional

router.patch('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const profesionalsData = req.body;
        const profesionalsFound = await Professionals.getById(id);
        if(!profesionalsFound){
            throw createError(404, "Professional not found");
            }
            professionalUpdate = await Professionals.updateById(id, profesionalsData, {new:true});
            res.json({
                success:true,
                message: "Update one professional",
                data:{professionalUpdate}
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
