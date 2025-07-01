const express  =require('express');
var Router = require('router')

var router = Router();



const articalController = require('../controllers/articalController');
const categoryController = require('../controllers/categoryController');
const commentConroller = require('../controllers/commnetController');
const userController = require('../controllers/userController');

// Login Route

router.get('/',userController.loginPage);
router.post('/index',userController.adminLogin);
router.get('/logout',userController.logout);

// Crud Route
router.get('/users',userController.allUsers);
router.get('/add-user',userController.addUserPage);
router.post('/add-user',userController.addUser);
router.get('/update-user/:id',userController.updateUserPage);
router.post('/update-user/:id',userController.updateUser);
router.delete('/delete-user/:id',userController.deleteUser);



// category user
router.get('/categories',categoryController.allCategories);
router.get('/add-category',categoryController.addCategoryPage);
router.post('/add-category',categoryController.addCategory);
router.get('/update-category/:id',categoryController.updateCategoryPage);
router.post('/update-category/:id',categoryController.updateCategory);
router.get('/delete-category/:id',categoryController.deleteCategory);


// artical Crud

router.get('/articles',articalController.allArticles);
router.get('/add-article',articalController.addArticlePage);
router.post('/add-article',articalController.addArticle);
router.get('/update-article/:id',articalController.updateArticlePage);
router.post('/update-article/:id',articalController.updateArticle);
router.get('/delete-article/:id',articalController.deleteArticle);


// Comment route


router.get('/comments',commentConroller.allComments);


module.exports = router;
