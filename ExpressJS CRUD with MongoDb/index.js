const Contact = require("./models/contact_module");  // ✅ Correct

const express = require("express");

const app = express();

app.listen(3000, () => {
  console.log("route is working");
});

app.set("view eingine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


 
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/contact-crud")
.then(() => console.log("✅ Database connected"))
.catch((err) => console.log("❌ Database connection error:", err));


app.get("/", async(req, res) => {
  const contact  =await Contact.find();
// res.json(contact);


  res.render("all-post.ejs",{contact});
});
app.get("/show-contact/:id", async(req, res) => {
    const contact  = await Contact.findById(req.params.id);
    // res.json(contact);


  res.render("show-contact.ejs",{contact});
});
app.get("/add-contact", (req, res) => {
  res.render("add-contact.ejs");
});
app.post("/add-contact", (req, res) => {});
app.get("/update-contact/:id", (req, res) => {
  res.render("update-contact.ejs");
});
app.post("/update-contact", (req, res) => {});
app.get("/delete/:id", (req, res) => {});
