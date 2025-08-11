const CommentModel = require('../models/Comment');
const newsModel = require('../models/News');




const allComments = async (req, res) => {
    let comment;
    if(req.role == 'admin'){  
         comment = await CommentModel.find().populate('article','title').sort({createdAt:-1});
    }else{
        const news = await newsModel.find({aurhor:req.id});
        const newsId  = await news.map(news=>news._id);
         comment = await CommentModel.find({article:{$in:newsId}}).populate('article','title').sort({createdAt:-1});
    }

    // return res.json(comment);
    res.render('admin/comments',{comment,role:req.role});
};


const updateComment = async(req,res)=>{
    try {
        const comment  = await CommentModel.findByIdAndUpdate(req.params.id,{status:req.body.status});
        if(!comment) return res.json({success:false});
        return res.json({success:true});
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({success:false,message:'Internal Server Error'});
    }
}

const deleteComment = async(req,res)=>{
try {
    const deleteComment  = await CommentModel.findByIdAndDelete(req.params.id);
    if(!deleteComment) return res.json({success:false});
    return res.json({success:true});
} catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({success:false,message:'Internal Server Error'});
}
}



module.exports = {
    allComments,
    updateComment,
    deleteComment
};
