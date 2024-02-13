const mongoose = require("mongoose");

const msgsch=mongoose.Schema({
    name:{
        type:String,
        required:true
    },sendAt:{
        type:Number,
        default:Date.now()
    },
    email:{
        type:String,
        default:""
    },
    phone:{
        type:Number,
       default:0
    },
    subject:{
        type:String,
        default:""
    },
    body:{
        type:String,
        required:true
        
    }
})

const Message=mongoose.model("msg",msgsch)
module.exports=Message