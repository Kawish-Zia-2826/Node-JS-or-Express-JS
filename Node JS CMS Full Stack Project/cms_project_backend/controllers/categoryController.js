const categoryModel = require('../models/Category');
const createError = require('../utils/error-message');

const allCategories = async (req, res,next) => {
    try {
        const categories = await categoryModel.find();
       res.render('admin/category',{categories,role:req.role})
    } catch (error) {
        // console.error('Error fetching categories:', error);
        // res.status(500).send('Internal Server Error');
        next(error); // Pass the error to the next middleware
    }   
    

    
};
const addCategoryPage = async (req, res,next) => {
    res.render('admin/category/create',{role:req.role})
};
const addCategory = async (req, res) => {
       
    try {
        await categoryModel.create(req.body);
        res.redirect('/admin/category');
    } catch (error) {
        // console.error('Error adding category:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
};
const updateCategoryPage = async (req, res,next) => {
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category)  return next(createError('Category not found', 404));
        
        res.render('admin/category/update', { category, role: req.role });
    } catch (error) {
        // console.error('Error fetching category for update:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
};
const updateCategory = async (req, res,next) => {
    try {
        const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
        if (!category)  return next(createError('Category not found', 404));
        res.redirect('/admin/category');
    } catch (error) {
        // console.error('Error updating category:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
    
};
    

const deleteCategory = async (req, res,next) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        // console.error('Error deleting category:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
};


module.exports = {
    allCategories,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};









