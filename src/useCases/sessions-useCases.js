const Sessions = require("../models/sessions-models")


// Create sessions 

async function create(data){
    const newSessions = await Sessions.create(data)
    return newSessions
}
// Get all sessions 
async function getAll(){
    const allSessions = await Sessions.find()
    return allSessions
}
// Get sessions by id
async function getById(id){
    const idSessions = await Sessions.findById(id)
    return idSessions
}
// Update sessions 

async function updateById(id, newData){
    const updatedSessions = await Sessions.findByIdAndUpdate(id, newData, {new: true})
    return updatedSessions
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
}