const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const newSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
        type: String,
        required: true
    },
    images: {
        type: string,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

newSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('News', newSchema);
