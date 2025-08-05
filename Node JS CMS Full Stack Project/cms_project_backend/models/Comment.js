const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'News' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, default: 'pending' },
  
},{timestamps:true 

});

module.exports = mongoose.model('Comment', commentSchema);
