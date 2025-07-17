const categoryModel = require('../models/Category');


const allCategories = async (req, res) => {
    try {
        // const categories = await categoryModel.find();
       res.render('admin/category',{role:req.role})
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Internal Server Error');
    }   
    

    
};
const addCategoryPage = async (req, res) => {
    res.render('admin/category/create',{role:req.role})
};
const addCategory = async (req, res) => {
       
    try {
        await categoryModel.create(req.body);
        res.redirect('/admin/category');
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send('Internal Server Error');
    }
};
const updateCategoryPage = async (req, res) => {
    res.render('admin/category/update',{role:req.role})
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









