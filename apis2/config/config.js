const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")  
dotenv.config()

const dbConnect  = ()=>{
  mongoose.connect(process.env.URL,{
    useNewUrlParser: true,
  useUnifiedTopology: true
  })
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));
}


module.exports = dbConnect