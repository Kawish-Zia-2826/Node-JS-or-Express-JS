const express  = require('express');
const jwt = require('jsonwebtoken');
 const env  = require("dotenv")
 env.config();




const auth = (req,res,next)=>{
  try {
   const bearerToken  = req.headers['authorization'];
    if (typeof bearerToken === "undefined") {
      return res.status(401).json({ message: "Unauthorized access — no token passed" });
    }

   const token = bearerToken.split(' ')[1] 
   const decode = jwt.verify(token,process.env.JWT_SECRET)
   if(!decode) return res.status(401).josn({message:"unautrized or token expire"});
   req.token = decode
   next();
  } catch (error) {
   res.status(401).json({message:"cathc error",error:error.message});
  }
}

module.exports  = auth;