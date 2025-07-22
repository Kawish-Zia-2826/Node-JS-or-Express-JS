const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');
const fs = require('fs');
const path = require('path');

const allArticles = async (req, res) => {
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
        console.error('Error fetching articles:', error);
        res.status(500).send('Internal Server Error');
    }


    
};

const addArticlePage = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render('admin/articles/create',{categories,role:req.role})
};
const addArticle = async (req, res) => {
    
    try {

       
        const {title, content, category} = req.body;
        const news = new newsModel({
            title,
            content,
            category,
            images: req.file.filename,
            author: req.id
        });
        await news.save();
        res.redirect('/admin/article');
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).send('Internal Server Error ' + error.message);
    }
};
const updateArticlePage = async (req, res) => {

    try {
        const article = await newsModel.findById(req.params.id).populate('category','name').populate('author','fullname');
        if(!article) return res.status(404).send('Article not found');
         if(req.role == "author" ){
            if(req.id != article.author._id) {
                return res.status(403).send('You are not authorized to delete this article');
            }
        }
        const categories = await CategoryModel.find();
        res.render('admin/articles/update',{article,categories,role:req.role})
    } catch (error) {
        console.error('Error fetching article for update:', error);
        res.status(500).send('Internal Server Error');
    }


   
};
const updateArticle = async (req, res) => {
    try {
       const article  = await newsModel.findById(req.params.id);
       if(!article) return res.status(404).send('Article not found');
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
        console.error('Error updating article:', error);
        res.status(500).send('Internal Server Error ' + error.message);
    }
};
const deleteArticle = async (req, res) => {
    try {
        const article = await newsModel.findById(req.params.id);
        if(!article) return res.status(404).send('Article not found');
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
        console.error('Error deleting article:', error);
        res.status(500).send('Internal Server Error');
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



