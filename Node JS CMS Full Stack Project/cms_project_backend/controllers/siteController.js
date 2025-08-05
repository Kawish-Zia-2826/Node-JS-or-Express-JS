const mongoose = require('mongoose');

const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');
const CommentModel = require('../models/Comment');
const settingModel = require('../models/Setting');
const loadData=  require('../middleware/loadData');
const paginate  = require('../utils/paginate');


const index  = async(req,res)=>{
    

    const paginateData=await  paginate(newsModel,{},req.query,
        {
            populate:[
                {path:'category',select:'name slug'},
                {path:'author',select:'fullname'}
            ]
        },
        {sort:'-createdAt'} 
    )


    
        res.render('index',{paginateData,query:req.query})
}
const articleByCategories  = async (req,res)=>{
    const catageory = await CategoryModel.findOne({slug:req.params.name});
    const catageoryName  = catageory.name;
    if(!catageory) return next(createError('Category not found', 404));
   
      const paginateData=await  paginate(newsModel,{category:catageory._id},req.query,
        {
            populate:[
                {path:'category',select:'name slug'},
                {path:'author',select:'fullname'}
            ]
        },
        {sort:'-createdAt'} 
    )
    res.render('category',{paginateData,catageoryName,query:req.query})
}
const singleArticle  = async(req,res)=>{
    
    const singleNews  = await newsModel.findById(req.params.id).populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});

    const comment  = await CommentModel.find({article:req.params.id,status:'aproved'}).sort({createdAt:-1});
    
    res.render('single',{singleNews,comment});
     
    
}
const search  = async(req,res)=>{
    const searchQuery = req.query.search;
  

    const paginateData=await  paginate(newsModel,{$or:[
        {title:{$regex:searchQuery,$options:'i'}},
        {content:{$regex:searchQuery,$options:'i'}}
    ]},req.query,
        {
            populate:[
                {path:'category',select:'name slug'},
                {path:'author',select:'fullname'}
            ]
        },
        {sort:'-createdAt'} 
    )
     res.render('search',{paginateData,searchQuery,query:req.query});

     
    
}
const author  = async(req,res)=>{
    const author = await userModel.findOne({_id:req.params.id});
    if(!author) return res.status(404).json({message:"Author not found"});
//    const news  = await newsModel.find({author:req.params.id}).populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});
  

    const paginateData= await paginate(newsModel,{author:req.params.id},req.query,
        {
            populate:[
                {path:'category',select:'name slug'},
                {path:'author',select:'fullname'}
            ]
        },
        {sort:'-createdAt'} 
    )
    
    // return res.json(news);
// paginateData

    res.render('author',{paginateData,author,query:req.query});
}
const addComment  = async(req,res)=>{
    try {
        const {name,email,content} = req.body
        const comment = await new CommentModel({name,email,content,article:req.params.id}).save();
        res.redirect(`/single/${req.params.id}`);
    } catch (error) {
        console.error("comment Error",error.message);
    }


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








