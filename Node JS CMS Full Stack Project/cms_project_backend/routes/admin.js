const express  =require('express');
var Router = require('router')
const validate  = require('../middleware/validator');

var router = Router();
const issLogedIn = require('../middleware/issLogedIn');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/multer');



const articalController = require('../controllers/articalController');
const categoryController = require('../controllers/categoryController');
const commentConroller = require('../controllers/commnetController');
const userController = require('../controllers/userController');

// Login Route
router.get('/signup-user',userController.signupPage);
router.post('/signUp',validate.signUpValidator,userController.signUp,);
router.get('/',userController.loginPage);
router.post('/index',validate.LoginValidator,userController.adminLogin);
router.get('/logout',userController.logout);
router.get('/dashboard',issLogedIn,userController.dashboard);
router.get('/settings',issLogedIn,isAdmin,userController.setting);
router.post('/save-settings',issLogedIn,isAdmin,upload.single('website_logo'),userController.saveSetting);

// Crud Route
router.get('/users',issLogedIn,isAdmin,userController.allUsers);
router.get('/add-user',issLogedIn,isAdmin,userController.addUserPage);
router.post('/add-user',issLogedIn,isAdmin,validate.userValidator,userController.addUser);
router.get('/update-user/:id',issLogedIn,isAdmin,userController.updateUserPage);
router.post('/update-user/:id',issLogedIn,isAdmin,validate.updateUserValidator,userController.updateUser);
router.delete('/delete-user/:id',issLogedIn,isAdmin,userController.deleteUser);



// category user
router.get('/category',issLogedIn,isAdmin,categoryController.allCategories);
router.get('/add-category',issLogedIn,isAdmin,categoryController.addCategoryPage);
router.post('/add-category',issLogedIn,isAdmin,validate.categoryValidator,categoryController.addCategory);
router.get('/update-category/:id',issLogedIn,isAdmin,categoryController.updateCategoryPage);
router.post('/update-category/:id',issLogedIn,isAdmin,validate.updateCategoryValidator,categoryController.updateCategory);
router.delete('/delete-category/:id',issLogedIn,isAdmin,categoryController.deleteCategory);


// artical Crud

router.get('/article',issLogedIn,articalController.allArticles);
router.get('/add-article',issLogedIn,articalController.addArticlePage);
router.post('/add-article',upload.single('image'),issLogedIn,validate.articalValidator,articalController.addArticle);
router.get('/update-article/:id',issLogedIn,articalController.updateArticlePage);
router.post('/update-article/:id',upload.single('image'),issLogedIn,validate.articalValidator,articalController.updateArticle);
router.delete('/delete-article/:id',issLogedIn,articalController.deleteArticle);


// Comment route


router.get('/comments',issLogedIn,commentConroller.allComments);
router.put('/update-comment-status/:id',issLogedIn,commentConroller.updateComment);
router.delete('/delete-comment/:id',issLogedIn,commentConroller.deleteComment);


//404 route

router.use((req,res,next)=>{
    res.status(404).render('admin/404',
      {message:"page not found",role:req.role,status:404}
    );
});


router.use(issLogedIn, (err, req, res, next) => {
   const status  =  err.status || 500;
   let viw;
   switch (status) {
       case 401:
            viw = 'admin/401';
           break;
       case 404:
            viw = 'admin/404';
           break;
       default:
            viw = 'admin/500';
           
   }
   res.status(status).render(viw, {
   layout: status === 404 ? false : undefined,
       message: err.message || 'Internal Server Error',
       role: req.role,
       status,
        
   });
  }); 


// router.use(issLogedIn, (err, req, res, next) => {
//     console.error(err.stack);
//     res.render('admin/500.ejs', { message: 'Internal Server Error', role: req.role });
//   }); 


module.exports = router;
