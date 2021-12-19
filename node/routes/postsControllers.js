const express = require("express");
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId;
const { PostsModel} = require("../models/postsModel")
router.get('/',(req, res) => {
  PostsModel.find((err, docs) => {
    if(!err) res.send(docs);
    else console.log("Error to get data : " +err);
    // console.log(docs);
  })
});
router.get('/message', (req, res) =>{
  try{
    let message = "Hello world"
res.status(200).send({message : message});
  }catch{
    res.status(500).send("error get message")
  }
})
router.get('/json', (req, res)=>{
  const message = {
    "firstname": "Takwa",
    "status": 200
  }
  res.status(400).send({message : message})
})
router.get('/exemple3', (req, res) =>{
  const message = {
    "firstname": "Takwa",
    "lastName": "Belghith",
    "brithdate": "21/10/1997"
  }
  res.status(200).send({message: message})
})






module.exports= router;