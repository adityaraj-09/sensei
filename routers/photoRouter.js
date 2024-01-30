
const mongoose = require("mongoose");
const express = require("express");
const ejs = require('ejs');
const path = require('path');
const Photo=require("../models/photo")
const photoRouter = express.Router();
const multer=require("multer")
const storage = multer.memoryStorage();
const upload = multer({ dest: "./upload" });



photoRouter.get("/home",async (req,res)=>{
    try {
        const photos=await Photo.find({});
        console.log(photos)
        res.render("home",{imgs:photos})
    } catch (error) {
        res.status(500).json(error)
    }
   
})
photoRouter.post("/upload",async (req,res)=>{
    try {
        const {url,type}=req.body
        
        let p=new Photo({
            url:url,
            type
        })
       p=await p.save()
        res.status(200).json(p)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=photoRouter