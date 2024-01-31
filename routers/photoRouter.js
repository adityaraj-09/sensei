
const mongoose = require("mongoose");
const express = require("express");
const ejs = require('ejs');
const path = require('path');
const Photo=require("../models/photo")
const Album=require("../models/Album")
const photoRouter = express.Router();
const multer=require("multer")
const storage = multer.memoryStorage();
const upload = multer({ dest: "./upload" });

photoRouter.get("/test",async (req,res)=>{
    res.status(200).send("Hello")
})

photoRouter.get("/",async (req,res)=>{
    try {
        const photos=await Photo.find({});
       
        res.render("index",{imgs:photos})
    } catch (error) {
        res.status(500).json(error)
    }
   
})
photoRouter.get("/albums",async (req,res)=>{
    try {
        const albums=await Album.find({});

        res.status(200).json(albums)
    } catch (error) {
        res.status(500).json(error)
    }
})
photoRouter.post("/upload",async (req,res)=>{
    try {
        const {url,type,by}=req.body
        
        let p=new Photo({
            url:url,
            type,
            by
        })
       p=await p.save()
       const album=await Album.findOne({title:type})
       if(album){
        let arr=album.photos
        arr.push(p._id)
        album.photos=arr
        await album.save()
       }else{
        let arr=[]
        arr.push(p._id)
        let newA=new Album({
            title:type,
            photos:arr,
            createdBy:by
        })
        newA=await newA.save()
       }
        res.status(200).json(p)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=photoRouter