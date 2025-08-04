const mongoose = require('mongoose');

const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');
const CommentModel = require('../models/Comment');
const settingModel = require('../models/Setting');
const loadData=  require('../middleware/loadData');



const index  = async(req,res)=>{
    const news  = await newsModel.find().populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});

    const catagoriesInUse =await newsModel.distinct('category');
    const catagories = await CategoryModel.find({'_id':{$in:catagoriesInUse}});
    
    const setting = await settingModel.findOne();
    const slidebar = await newsModel.find().populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});
    
    res.render('index',{news,catagories,slidebar,setting})
}
const articleByCategories  = async (req,res)=>{
    const catageory = await CategoryModel.findOne({slug:req.params.name});
    const catageoryName  = catageory.name;
    if(!catageory) return next(createError('Category not found', 404));
     const news  = await newsModel.find({category:catageory._id}).populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});

    const catagoriesInUse =await newsModel.distinct('category');
    const catagories = await CategoryModel.find({'_id':{$in:catagoriesInUse}});


  
    res.render('category',{news,catagories,catageoryName})
}
const singleArticle  = async(req,res)=>{
    
    const singleNews  = await newsModel.findById(req.params.id).populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});

    const catagoriesInUse = await newsModel.distinct('category');
    const catagories = await CategoryModel.find({'_id':{$in:catagoriesInUse}});
    res.render('single',{singleNews,catagories})
     
    
}
const search  = async(req,res)=>{
    const searchQuery = req.query.search;
    const news  = await newsModel.find({$or:[
        {title:{$regex:searchQuery,$options:'i'}},
        {content:{$regex:searchQuery,$options:'i'}}
    ]}).populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});
    const categoryInUse  = await newsModel.distinct('category');

    const catagories  =  await CategoryModel.find({'_id':{$in:categoryInUse}});
     res.render('search',{news,catagories,searchQuery});

    
}
const author  = async(req,res)=>{
    const author = await userModel.findById(req.params.id);
    if(!author) return res.status(404).json({message:"Author not found"});
   const news  = await newsModel.find({author:req.params.id}).populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});
  

    const catagoriesInUse =await newsModel.distinct('category');
    const catagories = await CategoryModel.find({'_id':{$in:catagoriesInUse}});
    res.render('author',{news,catagories,author})
}
const addComment  = async(req,res)=>{
    res.render('addComment')
}


module.exports = {

    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment

}








