const express = require("express");
const app = express();
const path = require("path");
var session = require('express-session')
const MongoStore = require('connect-mongo');
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store:MongoStore.create({mongoUrl:'mongodb://127.0.0.1:27017/sessions'}), // replace with your MongoDB connection string
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}))


app.get("/", (req, res) => {
  req.session.name = "John Doe"
  
  res.send(req.session.name)
});
app.get("/about", (req, res) => {
 if(req.session.name) {
    res.send(`Hello ${req.session.name}`)
  }else{
    res.send("dfsda")
  }
  
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect("/about")
    }
    res.send("Logout successful")
  })
})



app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));