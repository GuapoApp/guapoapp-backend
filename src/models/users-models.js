const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        Name:{
            type: String,
            required: true
        },
        Email:{
            type: String,
            required: true,
            match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        },
        Password:{
            type: String,
            required:true
        },
        Birth_Date:{
            type: Date,
            required: false
        },
        Role:{
            type: String,
            required: true,
            enum: ['ADMIN', 'CONSULTANT', 'PROFESSIONAL']
        }
    },
    {
        timestamps: true,
        statics: {
                encryptPassword: async(password) => {
                    const salt = await bcrypt.genSalt(15)
                    return await bcrypt.hash(password, salt)
                },
                isValidPassword: async(password, hash) => {
                    return await bcrypt.compare(password, hash)
                },
                createToken: async (payload) => {
                    const token = process.env.JWT_SIGN
                    return jwt.sign(payload, token, {expiresIn: '1h'})
                }       
        }   
    }
);

const userModel = mongoose.model('Users', userSchema);

module.exports = userModel;

