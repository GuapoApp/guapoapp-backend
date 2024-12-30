const mongoose = require('mongoose')

const sessionsSchema = new mongoose.Schema({
  Date: {
    type: Date,
    required: true
  },
  Transcript: {
    type: String,
    required: false
  },
  Status: {
    type: String,
    required: true,
    enum: [
      // 'Pending Confirmation',
      'Scheduled',
      'Cancelled',
      'Completed'
    ]
  },
  Paid: {
    type: Boolean
  },
  Professional: {
    type: mongoose.Types.ObjectId,
    ref: 'Professionals',
    required: true
  },
  Consultant: {
    type: mongoose.Types.ObjectId,
    ref: 'Consultants',
    required: true
  },
  Consultancy_Type: {
    type: String,
    required: true,
    enum: ['Integral', 'Event']
  },
  About: {
    type: String,
    required: false
  }
  // Event: {
  //   type: String,
  //   required: false
  // }
})

const sessionsModel = mongoose.model('Sessions', sessionsSchema)
module.exports = sessionsModel
