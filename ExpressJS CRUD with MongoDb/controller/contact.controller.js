
import Contact from "../models/contact_module.js"; 



export const getContact  = async(req, res) => {
  const contact  = await Contact.findById(req.params.id);
  // res.json(contact);


res.render("show-contact.ejs",{contact});
}

export const addContact = (req, res) => {
  res.render("add-contact.ejs");
}

export const addContacts = async (req, res) => {
  // const contact =await Contact.insertOne({
  //   first_name: req.body.first_name,
  //   last_name: req.body.last_name,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   address : req.body.address
  // })
  // {user_name,last_name,email,phone,address}=req.body
  await Contact.create(req.body);
  // res.send(req.body)

  res.redirect("/");
}

export const updateContact =  async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  res.render("update-contact.ejs",{contact});
}

export const  updateContacts = async(req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
}

export const deleteContact = async(req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.redirect("/");
}


export const allContact = async(req, res) => {
  const contact  =await Contact.find();
// res.json(contact);


  res.render("all-post.ejs",{contact});
}