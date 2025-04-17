const express = require("express");
const mongoose = require('mongoose');
const app = express();
const path = require("path");
var session = require('express-session')
const bcrypt = require("bcryptjs");
const User =  require("./module/model.js")
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));
app.get("/", (req, res) => res.send("Hello Wosdarld!"));


app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});
app.get("/login", (req, res) => {
  res.render("login", { title: "login  " });
});


app.post('/register', (req, res) => {
  const { name,email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  User.create({userName:name, password:hash})
  res.redirect("/login")
});


app.post('/login', (req, res) => {
const { email, password } = req.body;
const user  = User.findOne({ email })
if (!user){
  return res.status(400).send("User not found")
}else{
  const isMatch = bcrypt.compareSync(password, user.password)
  if (isMatch) {
    res.redirect("/")
  } else {
    res.status(400).send("Invalid password")
  }
}


})
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));