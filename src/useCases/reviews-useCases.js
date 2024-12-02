const Reviews= require("../models/reviews-models")
// Create Reviews

async function create(data){
    const newReviews = await Reviews.create(data)
    return newReviews
}
// Get all Reviews
async function getAll(){
    const allReviewss = await Reviews.find().populate("Consultants")
    return allReviewss
}
// Get Reviews by id
async function getById(id){
    const idReviews = await Reviews.findById(id).populate("Consultants")
    return idReviews
}
// Update Reviews

async function updateById(id, newData){
    const updatedReviews = await Reviews.findByIdAndUpdate(id, newData, {new: true})
    return updatedReviews
}

module.exports = {
    create,
    getAll,
    getById,
    updateById,
}