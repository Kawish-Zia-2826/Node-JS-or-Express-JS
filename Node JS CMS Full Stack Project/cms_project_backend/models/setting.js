const mongoose = require('mongoose');
const setting = mongoose.Schema({
  website_title:{
      type: String,
      required: true
  },
  website_logo:{
      type: String,
      
  },
  public_id:{
      type: String,
      required: true
  },
  footer_description:{
      type: String,
      required: true
  }
}
);


const Setting  = mongoose.model('Setting',setting);
module.exports = Setting;