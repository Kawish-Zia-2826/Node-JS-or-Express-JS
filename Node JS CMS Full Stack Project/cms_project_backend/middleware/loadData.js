
const mongoose = require('mongoose');
const NodeCache = require( 'node-cache' );
const myCache = new NodeCache();
const CategoryModel = require('../models/Category');
const newsModel = require('../models/News');
const settingModel = require('../models/Setting');


const loadData  =async (req,res,next)=>{
    try{
//         let catagories =  myCache.get('catagoriesCache');
//         let setting =  myCache.get('settingCache');
//         let slidebar =  myCache.get('latestNewsCache');

//         if (!(catagories && setting && slidebar)) {
//     const catagoriesInUse = await newsModel.distinct('category');
//     catagories = await CategoryModel.find({ '_id': { $in: catagoriesInUse } }).lean();
//     setting = await settingModel.findOne().lean();
//     slidebar = await newsModel.find()
//         .populate('category', { 'name': 1, 'slug': 1 })
//         .populate('author', 'fullname').limit(3)
//         .sort({ createdAt: -1 })
//         .lean();

//     myCache.set('catagoriesCache', catagories, 3600);
//     myCache.set('settingCache', setting, 3600);
//     myCache.set('latestNewsCache', slidebar, 3600);
// }


  const catagoriesInUse = await newsModel.distinct('category');
    let catagories = await CategoryModel.find({ '_id': { $in: catagoriesInUse } })
    // .lean();
    let setting = await settingModel.findOne()
    // .lean();
    let slidebar = await newsModel.find()
        .populate('category', { 'name': 1, 'slug': 1 })
        .populate('author', 'fullname').limit(3)
        .sort({ createdAt: -1 })
        // .lean();

    


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