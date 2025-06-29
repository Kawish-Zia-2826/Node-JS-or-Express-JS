const userModel = require('../models/User');


const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false
    })
};
const adminLogin = async (req, res) => {};
const logout = async (req, res) => {};



const allUsers = async (req, res) => {
    res.render('admin/users')
};
const addUserPage = async (req, res) => {
    res.render('admin/users/create')
};
const addUser = async (req, res) => {
    
};
const updateUserPage = async (req, res) => {
    res.render('admin/user/update')
};
const updateUser = async (req, res) => {};
const deleteUser = async (req, res) => {};



module.exports = {
    loginPage,
    adminLogin,
    logout,

    allUsers,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser
};