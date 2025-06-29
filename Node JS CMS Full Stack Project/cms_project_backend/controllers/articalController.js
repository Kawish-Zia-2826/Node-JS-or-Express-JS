const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');


const allArticles = async (req, res) => {
    res.render('admin/articles')
};
const addArticlePage = async (req, res) => {
    res.render('admin/articles/create')
};
const addArticle = async (req, res) => {};
const updateArticlePage = async (req, res) => {
    res.render('admin/update')
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



