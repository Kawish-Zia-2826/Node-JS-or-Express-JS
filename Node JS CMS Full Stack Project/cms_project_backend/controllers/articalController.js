const fs = require('fs');
const cloudinary = require('../utils/cloudnary.js');
const path = require('path');
const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');
const createError = require('../utils/error-message');
const {validationResult} = require('express-validator');



const allArticles = async (req, res,next) => {
let news;
    try {
        if(req.role == 'admin'){


         news = await newsModel.find()
        .populate('category','name')
        .populate('author','fullname')
        ;
        }else{
             news = await newsModel.find({author:req.id})
            .populate('category','name')
            .populate('author','fullname')
            ;
        }


        res.render('admin/articles/index',{news,role:req.role});
    } catch (error) {
     
        next(error);
    }


    
};

const addArticlePage = async (req, res,next) => {
    const categories = await CategoryModel.find();
    res.render('admin/articles/create',{categories,role:req.role,errors:0});
};
const addArticle = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('admin/articles/create', {
                errors: errors.array(),
                role: req.role,
                categories: await CategoryModel.find()
            });
        }

        if (!req.file) {
            return res.status(400).send("Image file is required");
        }

        const filePath = path.join(__dirname, `../public/uploads/${req.file.filename}`);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "articles"
        });

        // Optional: delete local file after upload
        fs.unlinkSync(filePath);

        const { title, content, category } = req.body;
        const news = new newsModel({
            title,
            content,
            category,
            images: result.secure_url, // Store Cloudinary URL
            author: req.id
        });

        await news.save();
        res.redirect('/admin/article');

    } catch (error) {
        next(error);
    }
};
const updateArticlePage = async (req, res,next) => {
            const id  = req.params.id;
    try {
        const article = await newsModel.findById(id).populate('category','name').populate('author','fullname');
        if(!article) {
            return next(createError('Article not found', 404));
            

        }         if(req.role == "author" ){
            if(req.id != article.author._id) {
                return res.status(403).send('You are not authorized to delete this article');
            }
        }
        const categories = await CategoryModel.find();
        res.render('admin/articles/update',{article,categories,role:req.role,errors:0})
    } catch (error) {
        // console.error('Error fetching article for update:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }


   
};
const updateArticle = async (req, res,next) => {
    const id = req.params.id;
    const error  = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).render('admin/articles/update',{
            errors:error.array(),
            role:req.role,
            article: await newsModel.findById(id).populate('category','name').populate('author','fullname'),
            categories: await CategoryModel.find()
        });
    }

    try {
        const article  = await newsModel.findById(id);
       if(!article)  return next(createError('Article not found', 404));
        if(req.role == "author" ){
            if(req.id != article.author._id) {
                return res.status(403).send('You are not authorized to delete this article');
            }
        }
         const {title, content, category} = req.body;
         article.title = title;
        article.content = content;
        article.category = category;
        if(req.file) {
            try {
                fs.unlinkSync(path.join(__dirname, '../public/uploads/', article.images));
            } catch (error) {
                console.error('Error deleting image:', error);
            }
            article.images = req.file.filename;
        }
        await article.save();
        res.redirect('/admin/article');
    
    } catch (error) {
        // console.error('Error updating article:', error);
        // res.status(500).send('Internal Server Error ' + error.message);
        next(error);
    }
};
const deleteArticle = async (req, res,next) => {
    try {
        const article = await newsModel.findById(req.params.id);
        if(!article)  return next(createError('Article not found', 404));
        if(req.role == "author" ){
            if(req.id != artical.author._id) {
                return res.status(403).send('You are not authorized to delete this article');
            }
        }
 try {
                fs.unlinkSync(path.join(__dirname, '../public/uploads/', article.images));
            } catch (error) {
                console.error('Error deleting image:', error);
            }        await article.deleteOne();
        res.json({message:"deleted successfully",success:true});
    } catch (error) {
        // console.error('Error deleting article:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
};


module.exports = {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
};



