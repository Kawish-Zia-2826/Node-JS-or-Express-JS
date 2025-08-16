const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const Setting = require('../models/Setting');
const createError = require('../utils/error-message');
const path = require('path');
const fs = require('fs');
const {validationResult} = require('express-validator');
const cloudinary = require('../utils/cloudnary.js')


const signupPage = async (req,res)=>{
    res.render('admin/signup',
       { layout:false,
        errors:0
       }
    )
}

const signUp = async(req,res,next)=>{
try{

    const error = validationResult(req)
    
    if(!error.isEmpty()){
        
        return res.status(404).render('admin/signup',{
            erros:error.array(),
            layout:false
        });
    }
   const author = await userModel.create(req.body);
    if(author){
        console.log('user created sucefully')
    }
    res.redirect('admin/')
}catch(error){
next(error)
}
    
}

const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false,
        errors:0,
        
    })
};
const adminLogin = async (req, res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
       
        return res.status(400).render('admin/login',{
            errors:errors.array(),
            layout:false
        });
    }

const {username, password} = req.body;

    try {
        const user = await userModel.findOne({username});
        if(!user)  return next(createError('User not found', 404));
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(createError('Incorrect user and password', 401));
          
        const jwtData = {id:user._id,fullname:user.fullname,role:user.role}
        const token = jwt.sign(jwtData, process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token', token, {httpOnly:true,maxAge:1000* 60 * 60}); // 1 hour
        res.redirect('/admin/dashboard');
    } catch (error) {
        
        next(error); 
    }

};
const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin/');
};


const dashboard = async (req,res)=>{
let countNews;
if(req.role == 'admin'){
 countNews = await newsModel.countDocuments();
}else{
    countNews = await newsModel.countDocuments({author:req.id}); 
}
const countCategories = await categoryModel.countDocuments();
const countUsers = await userModel.countDocuments();    



    res.render('admin/dashboard',{
        role:req.role,
        fullname:req.fullname,
        countNews,
        countCategories,
        countUsers
    });
}

const setting = async (req,res,next)=>{

    
       try {
        const settings = await Setting.findOne();
        res.render('admin/setting',{role:req.role,settings});
    } catch (error) {
  
      
        next(error); 
    }
}

const saveSetting = async (req, res, next) => {
    try {
        const { website_title, footer_description } = req.body;
        let website_logo = null;
        let public_id = null;

        const currentSetting = await Setting.findOne();

        if (req.file) {
            const filePath = path.join(__dirname, "../public/uploads", req.file.filename);

            // Agar pehle se Cloudinary par logo hai, to overwrite karein
            if (currentSetting?.public_id) {
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    public_id: currentSetting.public_id, // overwrite existing
                    overwrite: true,
                    invalidate: true
                });
                website_logo = uploadResult.secure_url;
                public_id = uploadResult.public_id;
            } else {
                // Naya upload
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    folder: "settings" // optional
                });
                website_logo = uploadResult.secure_url;
                public_id = uploadResult.public_id;
            }

            // Local file delete (server par space bachane ke liye)
            fs.unlinkSync(filePath);
        } else {
            // Agar naya file nahi hai to purana data use karo
            website_logo = currentSetting?.website_logo;
            public_id = currentSetting?.public_id;
        }

        // DB me upsert
        await Setting.findOneAndUpdate(
            {},
            {
                website_title,
                footer_description,
                website_logo,
                public_id
            },
            { new: true, upsert: true }
        );

        res.redirect("/admin/settings");
    } catch (error) {
        next(error);
    }
};


const allUsers = async (req, res) => {

    const users   = await userModel.find();

    res.render('admin/users',{users,role:req.role});
};
const addUserPage = async (req, res) => {
    res.render('admin/users/create',{
        role:req.role,
        errors:0
    })
};
const addUser = async (req, res,next) => {
    const errors = validationResult(req);
try {
    if(!errors.isEmpty()) {
        return res.status(400).render('admin/users/create',{
            errors:errors.array(),
            role:req.role
        });
    }
    await userModel.create(req.body);
    res.redirect('/admin/users');
} catch (error) {
    
    next(error);
}

};
const updateUserPage = async (req, res,next) => {
    try {
        const users = await userModel.findById(req.params.id);
        res.render('admin/users/update', { users ,role:req.role,errors:0});
        if(!users) return next(createError('User not found', 404)); 
    } catch (error) {
        
        next(error);
    }
    };
const updateUser = async (req, res,next) => {
    const id = req.params.id;
    const {fullname,usernamem,password} =  req.body;
    const error = validationResult(req);
    const users = await userModel.findById(req.params.id);

    try {
        if(!error.isEmpty()) {
            return res.status(400).render('admin/users/update',{
                errors:error.array(),
                role:req.role,
                users
            });
        }
       const user = await userModel.findByIdAndUpdate(id)
        if(!user) return next(createError('User not found', 404));
        user.fullname = fullname || user.fullname;
        user.username = usernamem || user.username;
        if(password){
                user.password = password; 
        };
        user.role = req.body.role || user.role;
        await user.save();
        res.redirect('/admin/users');



    } catch (error) {
        
        next(error);
    }
    

};

const deleteUser = async (req, res,next) => {
    const id = req.params.id;
    try {
        const user = await userModel.findById(id);
        if (!user) return next(createError('User not found', 404));
        const artical = await newsModel.findOne({'author':id});
        if(artical) return res.status(404).json({message:"User has articles",success:false});
       res.json({success: true, message: 'User deleted successfully'});
    } catch (error) {
       
        next(error); 
    }

};



module.exports = {
    signUp,
    signupPage,
    loginPage,
    adminLogin,
    logout,
    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    dashboard,
    setting,
    deleteUser,
    saveSetting
};