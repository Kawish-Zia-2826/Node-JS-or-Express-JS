const mongoose = require("mongoose");



 const connect =  mongoose.connect("mongodb://127.0.0.1:27017/crud");





// Declare the Schema of the Mongo model
var userSchema =  mongoose.Schema({
    name:{
        type:String,
   
    },
    email:{
        type:String,

    },
    image:{
        type:String,
    
    }
});


//Export the model
module.exports = mongoose.model('user', userSchema);