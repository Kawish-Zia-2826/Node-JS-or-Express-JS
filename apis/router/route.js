const express = require('express');
const User = require('../models/model.js');
const mongoose = require('mongoose');
const router = express.Router();




router.get('/',async(req,res)=>{
try {
  const users = await User.find()
  if(!users) return res.status(404).json({message:"No users found"})
    res.status(200).json(users)

  
} catch (error) {
  res.status(500).json({message:error.message})
}
});

router.get('/:id',async(req,res)=>{
  try {
    const users = await User.findById(req.params.id)
    if(!users) return res.status(404).json({message:"No users found"})
      res.status(200).json(users)
    


  } catch (error) {
    res.status(500).json({message:error.message})
  }
  }
  );
router.post('/',async(req,res)=>{
  try {
    const users =await User.create(req.body)
    if(!users) return res.status(404).josn({message:"No users found"})
      res.status(200).json(users)
    



  } catch (error) {
    res.status(500).json({message:error.message})
  }
  });
  router.put('/:id',async(req,res)=>{
try {
  const users = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
  if(!users) return res.status(404).json({message:"No users found"})
    res.status(200).json(users)
  
  
} catch (error) {
  res.status(500).json({message:error.message})
}
});



router.delete('/:id',async (req,res)=>{
  try {
    const users = await User.findByIdAndDelete(req.params.id)
    if(!users) return res.status(404).json({message:"No users found"})


      res.status(200).json("users deleted successfully")
    
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  });
module.exports = router;



  