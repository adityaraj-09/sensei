const mongoose = require("mongoose");

const albumSch=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    photos:{
        type:Array,
        default:[]
    },
    createdAt:{
        type:Number,
        default:Date.now()
    },createdBy:{
        type:String,
        required:true
    }
})

const Album =mongoose.model("album",albumSch)
module.exports=Album