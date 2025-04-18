const express = require("express");
const app = express();
const path = require("path");
var cookieParser = require('cookie-parser');
const e = require("express");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(cookieParser("kawish"))



app.get('/create-cookie', (req, res) => {
  const create = res.cookie('name','kawish',{
    maxAge: 1000*60*60*24, // 1 day,
    sign:true
    
  })

  create ? res.send("cookie created") : res.send("cookie not created")
});

app.get('/get-cookie', (req, res) => {
  req.cookies?res.send(req.signedCookies.name):res.send("cookie not found")
});

app.get('/delete-cookie', (req, res) => {
  const del  = res.clearCookie('name')

  if(del){
    res.send("cookie deleted")
  }
  else{
    res.send("cookie not deleted")
  }
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));