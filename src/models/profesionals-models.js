const mongoose = require ('mongoose')


const professionalSchema = new mongoose.Schema(
    {
        About:{
            type:String,
            required: true,
        },
        Consultants:{
            type:Array,
            required:true,
        },
        Sessions:{
            type:Array,
            required:true,
        },
        UserId:{
            type:mongoose.Schema.ObjectId,
            ref:"Users",
        }
    }
);

const professionalModel = mongoose.model('Professional', professionalSchema);
module.exports = professionalModel;  //export the model to use in other files.  //export