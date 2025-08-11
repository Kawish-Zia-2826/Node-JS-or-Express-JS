const express  =require('express');
const router   = express.Router();
const loadData = require('../middleware/loadData');


const siteController = require('../controllers/siteController');

router.use(loadData)
router.get('/',siteController.index);
router.get('/category/:name',siteController.articleByCategories);
router.get('/single/:id',siteController.singleArticle);
router.get('/search',siteController.search);
router.get('/author/:id',siteController.author);
router.post('/single/:id/comment',siteController.addComment);
router.use((req,res,next)=>{
  res.status(404).render('404',{
    message:"page not found",
    status:404 
  });
});




router.use( (err, req, res, next) => {
   const status  =  err.status || 500;
   console.log(err.stack);
    
   res.status(status).render('error', {
       message: err.message || 'Internal Server Error',
          status,
        
   });
  }); 

module.exports = router;
