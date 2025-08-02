const categoryModel = require('../models/Category');
const createError = require('../utils/error-message');
const {validationResult} = require('express-validator');
const newsModel = require('../models/News');

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
    res.render('admin/category/create',{role:req.role,errors:0})
};
const addCategory = async (req, res) => {
       const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).render('admin/category/create', {
            errors: error.array(),
            role: req.role
        });
    }
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
    const id = req.params.id;
    try {
        const category = await categoryModel.findById(id);
        if (!category)  return next(createError('Category not found', 404));
        
        res.render('admin/category/update', { category, role: req.role,errors:0 });
    } catch (error) {
        // console.error('Error fetching category for update:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
};
const updateCategory = async (req, res,next) => {
     const category = await categoryModel.findById(req.params.id);
     const error  = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).render('admin/category/update', {
            errors: error.array(),
            role: req.role,
            category: category

        });
    }
    const id  = req.params.id;
    try {
        const category  = await categoryModel.findById(id);
          if (!category)  return next(createError('Category not found', 404));
        category.name = req.body.name;
        category.description = req.body.description;
        await category.save();
        res.redirect('/admin/category');
    } catch (error) {
        // console.error('Error updating category:', error);
        // res.status(500).send('Internal Server Error');
        next(error);
    }
    
};
    

const deleteCategory = async (req, res,next) => {
    const id = req.params.id;
    try {
       const category  = await categoryModel.findById(id);
        if (!category)  return next(createError('Category not found', 404));
       const artical  = await newsModel.findOne({'category':id});
        if(artical) return res.status(400).json({success:false,message:"Category has articles"});
        await category.deleteOne();
        res.json({message:"deleted successfully",success:true});

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









