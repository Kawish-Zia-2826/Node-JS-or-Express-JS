const mongoose = require('mongoose');


const auth = new mongoose.Schema({
userName:{
    type: String,
    required: true,
    unique: true,
},
password:{
    type: String,
    required: true,
},
});


module.exports = mongoose.model('Auth', auth);

