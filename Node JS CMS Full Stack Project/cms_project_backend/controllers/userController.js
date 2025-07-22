const userModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const Setting = require('../models/Setting');


const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false
    })
};
const adminLogin = async (req, res) => {
const {username, password} = req.body;

    try {
        const user = await userModel.findOne({username});
        if(!user) return res.status(404).send('User  not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).send('Incorect  password');
        const jwtData = {id:user._id,fullname:user.fullname,role:user.role}
        const token = jwt.sign(jwtData, process.env.JWT_SECRET,{expiresIn:'1h'});
        res.cookie('token', token, {httpOnly:true,maxAge:1000* 60 * 60}); // 1 hour
        res.redirect('/admin/dashboard');
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).send('Internal Server Error');
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

const setting = async (req,res)=>{
    try {
        const setting = await Setting.findOne();
        res.render('admin/setting',{role:req.role,setting});
    } catch (error) {
        console.error('Error fetching setting:', error);
        res.status(500).send('Internal Server Error');
    }
}

const saveSetting = async(req,res)=>{

    try{
        const {website_title, footer_description} = req.body;
        let website_logo = req.file ? req.file.filename : null;
        const setting  = await Setting.findOneAndUpdate(
            {},
            {website_title, footer_description, website_logo},
            {new: true, upsert: true} // Create if it doesn't exist
            );
            res.redirect('/admin/settings');
    }catch(error){
        console.error('Error saving setting:', error);
        res.status(500).send('Internal Server Error');
    }

}


const allUsers = async (req, res) => {

    const users   = await userModel.find();

    res.render('admin/users',{users,role:req.role});
};
const addUserPage = async (req, res) => {
    res.render('admin/users/create',{role:req.role})
};
const addUser = async (req, res) => {
try {
    await userModel.create(req.body);
    res.redirect('/admin/users');
} catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Internal Server Error');
}

};
const updateUserPage = async (req, res) => {
    try {
        const users = await userModel.findById(req.params.id);
        res.render('admin/users/update', { users ,role:req.role});
        if(!users) return res.status(404).send('User not found');   
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).send('Internal Server Error');
    }
    };
const updateUser = async (req, res) => {
    const id = req.params.id;
    const {fullname,usernamem,password} =  req.body;
    try {
       const user = await userModel.findByIdAndUpdate(id)
        if(!user) {
            return res.status(404).send('User not found');
        }

        user.fullname = fullname || user.fullname;
        user.username = usernamem || user.username;
        if(password){
                user.password = password; 
        };
        user.role = req.body.role || user.role;
        await user.save();
        res.redirect('/admin/users');



    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
    

};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
       res.json({success: true, message: 'User deleted successfully'});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }

};



module.exports = {
    loginPage,
    adminLogin,
    logout,
    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
    dashboard,
    setting,
    saveSetting
};