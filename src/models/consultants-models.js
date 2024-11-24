const mongoose = require('mongoose')

const consultantSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User is required']
    },
    Curriculum_File: {
      type: String,
      required: [true, 'Curriculum File is required']
    },
    Experience: {
      type: String,
      required: [true, 'Experience is required']
    },
    Instagram: {
      type: String
    },
    Facebook: {
      type: String
    },
    Linkedin: {
      type: String
    },
    Pending_Balance: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const consultantModel = mongoose.model('Consultants', consultantSchema)

module.exports = consultantModel
