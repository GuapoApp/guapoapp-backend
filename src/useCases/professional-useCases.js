const Professional = require("../models/profesionals-models")


// Create professional

async function create(data){
    const newProfessional = await Professional.create(data)
    return newProfessional
}
// Get all professional
async function getAll(data){
    const allProfessionals = await Professional.find(data)
    return allProfessionals
}
// Get professional by id
async function getById(id){
    const idProfessional = await Professional.findById(id)
    return idProfessional
}
// Update professional

async function updateById(id, newData){
    const updatedProfessional = await Professional.findByIdAndUpdate(id, newData, {new: true})
    return updatedProfessional
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
}