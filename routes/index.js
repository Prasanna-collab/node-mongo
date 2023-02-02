var express = require('express');
var router = express.Router();
const {Email,Students} = require("./Schema")
const { dbUrl, mongodb, MongoClient } = require("../dbConfig");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);


mongoose.connect(dbUrl);

router.get("/", async(req,res)=>{
  const document = await Email.find();
  res.json({message:"Your Email Id is", data: document})
})
router.post("/email", async(req,res)=>{
 try {
  const email = await Email.create(req.body);
  res.json({message:"Email Fetched Successfully!!!!"})
 } catch (error) {
  console.log(error._message)
  res.json({message:error._message})
 }
})




module.exports = router;
