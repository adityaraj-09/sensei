
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
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
photoRouter.get("/view",async (req,res)=>{
    try {
        const api_url ="https://zenquotes.io/api/quotes/";
        
        async function getapi(url)
        {
          const response = await fetch(url);
          var data = await response.json();
          return data.slice(0,5)
        }
        const t=await getapi(api_url)
        const photos=await Photo.find({});
        const albums=await Album.find({})
        const randomIndices = Array.from({ length: 5 }, () => getRandomInt(0, photos.length - 1));

  // Extract 5 random images
  const randomImages = randomIndices.map(index => photos[index]);
        res.render("album",{imgs:randomImages,quote:t,albums:albums})
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
photoRouter.get("/getAlbumById/:id",async (req,res)=>{
    try {
        const {id}=req.params
        const album=await Album.findById(id);
        const photo=await Photo.findById(album.photos[0])
        res.status(200).json(photo)
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