const mongoose = require('mongoose');


const CategoryModel = require('../models/Category');
const userModel = require('../models/User');
const newsModel = require('../models/News');
const CommentModel = require('../models/Comment');


const index  = async(req,res)=>{}
const articleByCategories  = async(req,res)=>{}
const singleArticle  = async(req,res)=>{}
const search  = async(req,res)=>{}
const author  = async(req,res)=>{}
const addComment  = async(req,res)=>{}


module.exports = {

    index,
    articleByCategories,
    singleArticle,
    search,
    author,
    addComment

}








