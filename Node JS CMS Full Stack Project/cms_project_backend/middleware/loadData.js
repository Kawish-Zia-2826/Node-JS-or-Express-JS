
const mongoose = require('mongoose');

const CategoryModel = require('../models/Category');
const newsModel = require('../models/News');
const settingModel = require('../models/Setting');


const loadData  =async (req,res,next)=>{
    try{
        const catagoriesInUse =await newsModel.distinct('category');
        const catagories = await CategoryModel.find({'_id':{$in:catagoriesInUse}});
        const setting = await settingModel.findOne();
        const slidebar = await newsModel.find().populate('category',{'name':1,'slug':1}).populate('author','fullname').sort({createdAt:-1});

        res.locals.catagories = catagories;
        res.locals.setting = setting;
        res.locals.slidebar = slidebar;
        next();
    }catch(error){
        console.error('Error loading data:',error);
        next(error);
    }
}


module.exports =  loadData;