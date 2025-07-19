const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');


const allArticles = async (req, res) => {
    res.render('admin/articles/index',{role:req.role});
};

const addArticlePage = async (req, res) => {
    const categories = await CategoryModel.find();
    res.render('admin/articles/create',{categories,role:req.role})
};
const addArticle = async (req, res) => {
    
};
const updateArticlePage = async (req, res) => {
    res.render('admin/update',{role:req.role})
};
const updateArticle = async (req, res) => {};
const deleteArticle = async (req, res) => {};


module.exports = {
    allArticles,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
};



