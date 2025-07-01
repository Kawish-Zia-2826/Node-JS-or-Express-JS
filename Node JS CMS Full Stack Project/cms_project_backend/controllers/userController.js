const userModel = require('../models/User');


const loginPage = async (req, res) => {
    res.render('admin/login',{
        layout:false
    })
};
const adminLogin = async (req, res) => {};
const logout = async (req, res) => {};



const allUsers = async (req, res) => {

    const users   = await userModel.find();

    res.render('admin/users',{users});
};
const addUserPage = async (req, res) => {
    res.render('admin/users/create')
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
        res.render('admin/users/update', { users });
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
    deleteUser
};