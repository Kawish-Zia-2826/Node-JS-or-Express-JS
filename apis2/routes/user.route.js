const express  = require('express')
const router = express.Router()
const UserAuth = require('../modules/users.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require("dotenv");
dotenv.config();




router.post('/register',async(req,res)=>{
try {
  const {username,email,password} = req.body;
  
const isMatch = await UserAuth.findOne(
  {
    $or:[
      {username},
      {email}
    ]
  }
  
)

if(isMatch)  return res.status(409).json({message:"User or Email alerady Exist"});



  
  const hashedPass =await  bcrypt.hash(password,10)
  const user = await new UserAuth({username,email,password:hashedPass})
  const users = await user.save()
  res.send(users)
  console.log("register user "  + users);
} catch (error) {
  res.status(500).json({error:error.message,message:"catch error"})
}

})

router.post('/login',async(req,res)=>{
try {
    const {username,password} = req.body;
  const user  = await UserAuth.findOne({username});
  if(!user) return res.status(400).json({message:"user not found"})
    const isMatch  = await bcrypt.compare(password,user.password);
  if(!isMatch) return res.status(400).json({message:"password not match"})
    const token = jwt.sign({id:user._id,username:user.username},process.env['JWT_SECRET'],{expiresIn:'1h'});
  res.json({token})
  req.token = token;
} catch (error) {
  res.status(400).json({message:"catch error",error:error.message})
}
  
})

router.post('/logout',(req,res)=>{
  res.json({message:"user logout"})
})

module.exports = router;