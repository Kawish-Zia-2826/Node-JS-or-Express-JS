const categoryModel = require('../models/Category');


const allCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
       res.render('admin/category',{categories,role:req.role})
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
    try {
        const category = await categoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        
        res.render('admin/category/update', { category, role: req.role });
    } catch (error) {
        console.error('Error fetching category for update:', error);
        res.status(500).send('Internal Server Error');
    }
};
const updateCategory = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
        if (!category) {
            return res.status(404).send('Category not found');
        }
        res.redirect('/admin/category');
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send('Internal Server Error');
    }
    
};
    

const deleteCategory = async (req, res) => {
    try {
        await categoryModel.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send('Internal Server Error');
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









