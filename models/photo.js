const mongoose = require("mongoose");

const photosch=mongoose.Schema({
    url:{
        type:String,
        required:true
    },createdAt:{
        type:Number,
        default:Date.now()
    },
    type:{
        type:String,
        required:true 
    }
})

const Photo=mongoose.model("photo",photosch)
module.exports=Photo