const express = require('express');
const mongoose = require('mongoose');

const User = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
profilePic:{
    type:String,
  
}


})


module.exports = mongoose.model('User', User);
