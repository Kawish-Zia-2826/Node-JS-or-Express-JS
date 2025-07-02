const express  =require('express');
var Router = require('router')

var router = Router();
const issLogedIn = require('../middleware/issLogedIn');
const isAdmin = require('../middleware/isAdmin');



const articalController = require('../controllers/articalController');
const categoryController = require('../controllers/categoryController');
const commentConroller = require('../controllers/commnetController');
const userController = require('../controllers/userController');

// Login Route

router.get('/',userController.loginPage);
router.post('/index',userController.adminLogin);
router.get('/logout',userController.logout);
router.get('/dashboard',issLogedIn,userController.dashboard);
router.get('/settings',issLogedIn,isAdmin,userController.setting);

// Crud Route
router.get('/users',issLogedIn,isAdmin,userController.allUsers);
router.get('/add-user',issLogedIn,isAdmin,userController.addUserPage);
router.post('/add-user',issLogedIn,isAdmin,userController.addUser);
router.get('/update-user/:id',issLogedIn,isAdmin,userController.updateUserPage);
router.post('/update-user/:id',issLogedIn,isAdmin,userController.updateUser);
router.delete('/delete-user/:id',issLogedIn,isAdmin,userController.deleteUser);



// category user
router.get('/category',issLogedIn,isAdmin,categoryController.allCategories);
router.get('/add-category',issLogedIn,isAdmin,categoryController.addCategoryPage);
router.post('/add-category',issLogedIn,isAdmin,categoryController.addCategory);
router.get('/update-category/:id',issLogedIn,isAdmin,categoryController.updateCategoryPage);
router.post('/update-category/:id',issLogedIn,isAdmin,categoryController.updateCategory);
router.get('/delete-category/:id',issLogedIn,isAdmin,categoryController.deleteCategory);


// artical Crud

router.get('/article',issLogedIn,articalController.allArticles);
router.get('/add-article',issLogedIn,articalController.addArticlePage);
router.post('/add-article',articalController.addArticle);
router.get('/update-article/:id',issLogedIn,articalController.updateArticlePage);
router.post('/update-article/:id',articalController.updateArticle);
router.delete('/delete-article/:id',articalController.deleteArticle);


// Comment route


router.get('/comments',issLogedIn,commentConroller.allComments);





module.exports = router;
