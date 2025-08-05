const CommentModel = require('../models/Comment');




const allComments = async (req, res) => {
    
    if(req.role === 'admin'){
        const comment = await CommentModel.find().populate('article','title').sort({createdAt:-1});
    }else{
        const news = await newsModel.find({aurhor:req.id});
        const newsId  = await news.map(news=>news._id);
        const comment = await CommentModel.find({article:{$in:newsId}}).populate('article','title').sort({createdAt:-1});
    }


    return res.json(comment);
};


const updateComment = (req,res)=>{

}

const deleteComment = (req,res)=>{

}



module.exports = {
    allComments,
    updateComment,
    deleteComment
};
