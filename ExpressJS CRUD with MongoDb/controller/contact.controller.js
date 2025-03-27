
import Contact from "../models/contact_module.js"; 

import mongoose from 'mongoose';

export const getContact = async (req, res) => {





  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  
  
    res.render("show-contact.ejs", { contact });
  } catch (error) {
    res.render('404',{message:error.message})
  }
};

export const addContact = (req, res) => {

  res.render("add-contact.ejs");
}

export const addContacts = async (req, res) => {

  await Contact.create(req.body);

  res.redirect("/");
}

export const updateContact =  async (req, res) => {
 try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  
  
    res.render("update-contact.ejs", { contact });
  } catch (error) {
    res.render('404',{message:error.message})
  };
  
}

export const  updateContacts = async(req, res) => {
   try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  

    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body);

    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  
  
     res.redirect("/");
  } catch (error) {
    res.render('404',{message:error.message})
  }

 
}

export const deleteContact = async(req, res) => {
  
 
   try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  

    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  
  
     res.redirect("/");
  } catch (error) {
    res.render('404',{message:error.message})
  }
}


export const allContact = async(req, res) => {

  
  

 try {
   
  

    const contact  =await Contact.find();

    if (!contact) {
      return res.render("404.ejs", { message: "Page not found" });
    }
  
  
    res.render("all-post.ejs",{contact});
  } catch (error) {
    res.render('404',{message:error.message})
  }
  
}