const mongoose  = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  phone:{
    type: String,
    required: true
  },
  gender:{
    type: String,
    required: true,
    enum:["male","female","other"]
  },

  profile_pic:{
    type: String,
    default:"https://www.w3schools.com/howto/img_avatar.png"
  }

});

const user = mongoose.model("users", UserSchema);
module.exports = user;