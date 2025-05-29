// const mongoose = require("mongoose"); // ✅ Fixed Spelling
import  mongoose from "mongoose"; // ✅ Fixed Spelling
import paginate from 'mongoose-paginate-v2';

const contactSchema = new mongoose.Schema({ // ✅ Use 'new' for Schema
  first_name: {
    type: String, // ✅ Use 'String' with Capital S
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
});


contactSchema.plugin(paginate);

const Contact = mongoose.model("Contact", contactSchema); // ✅ Capitalized model name

// module.exports = Contact; 
export default Contact;
