const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const  bcrypt = require("bcryptjs");
var session = require('express-session')

const User = require('./model/mongo.js')

mongoose.connect('mongodb://127.0.0.1:27017/Auth-Validation')
  .then(() => console.log('Connected!'));
app.set("view engine", "ejs");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.get('/login', (req, res) => {
  res.render('login',{err:null})
});


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,

}))
app.post('/signup',async (req, res) => {
  const{email,password} = req.body
  const hash =await bcrypt.hash(password, 10)
  User.create({email:email,password:hash})
  
  res.redirect('/login')

});
app.get("/", async(req, res) => {
  if(!req.session.user){
    return res.redirect('/login')
  }else{
    res.send(`<h1>Hello ${req.session.user}</h1><a href="/logout">Logout</a>`)
  }
  
  
 
});

app.get('/signup', (req, res) => {
  if(req.session.user){
    return res.redirect('/')
  }else{
    res.render('signup')
  }
});

app.post('/login',async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({
    email:email
  })
  if (!user) {
    return res.render('login',{err:'user not found'})
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return res.render('login',{err:'Invalid email or passwordd'})
  }else{
    req.session.user = user
    req.session.user = user.email
    res.redirect('/')
  }
  
});


app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect('/login');
  });
});
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));