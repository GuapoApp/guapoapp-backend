const mongoose = require('mongoose')

const sessionsSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true
  },
  Transcript: {
    type: String,
    required: true
  },
  Status: {
    type: Array,
    required: true

  },
  Paid: {
    type: Boolean,
  },
    Professional: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: false
    },
    Consultant: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: false
    },
    
  })
  
  

 

  const sessionsModel = mongoose.model('Sessions', sessionsSchema)
  module.exports=sessionsModel