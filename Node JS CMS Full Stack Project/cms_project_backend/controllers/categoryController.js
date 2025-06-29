const CategoryModel = require('../models/Category');


const allCategories = async (req, res) => {
    res.render('admin/category')
};
const addCategoryPage = async (req, res) => {
    res.render('admin/category/create')
};
const addCategory = async (req, res) => {
    
};
const updateCategoryPage = async (req, res) => {
    res.render('admin/category/update')
};
const updateCategory = async (req, res) => {};
const deleteCategory = async (req, res) => {};


module.exports = {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};









