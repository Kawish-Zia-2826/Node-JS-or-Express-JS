const express = require('express');
const User = require('../models/model.js');
const mongoose = require('mongoose');
const router = express.Router();
const multer  = require('multer')
const path = require('path');


;
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image file are allowed!'), false);
  }
  cb(null, true);
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({
   storage: storage,
    limit: { fileSize: 3000000 },
    fileFilter:fileFilter // 1 MB limit
   })


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
router.post('/', upload.single('profilePic'), async(req,res)=>{
  try {
    // const users =await User.create(req.body)
    const user = new User(req.body)
   
    if(req.file) {
      user.profilePic = req.file.filename
      
    }
    
   
    const  users =  await user.save()
    // if(!users) return res.status(404).josn({message:"No users found"})
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



  