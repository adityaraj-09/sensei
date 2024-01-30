const express=require("express");
const mongoose=require("mongoose")
const cors =require("cors");
const process=require("process")
const photoRouter=require("./routers/photoRouter")
const app=express()


app.use(cors());
app.use(express.json())
app.use(photoRouter)
const dotenv = require('dotenv').config()
app.set('view engine', 'ejs');


// Set the directory where your EJS templates are located
app.set('views', __dirname + '/views'); 
app.use(express.static('public'));

mongoose.connect(process.env.DB).then(async()=>{
    console.log("connected to mongodb")
}).catch((e) => {
    console.log(e);
});
app.listen(process.env.PORT,"0.0.0.0",() =>{
    console.log(`connected at port ${process.env.PORT}`);
});