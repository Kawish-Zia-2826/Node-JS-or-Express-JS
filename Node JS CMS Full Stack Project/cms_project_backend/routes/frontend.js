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
router.get('/single/:id',siteController.addComment);


module.exports = router;
