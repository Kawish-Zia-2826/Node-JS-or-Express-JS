const express  =  require('express');
const mongoose = require('mongoose');

const userAuths = new mongoose.Schema({
  username:{
    unique: true,
    type: String,
    required: true
  },
  email:{
    required: true,
    type: String,
    unique: true,
  },
  password:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})


const UserAuth = mongoose.model('userauths', userAuths);
module.exports = UserAuth;