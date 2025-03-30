const express = require("express")
var cookieParser = require('cookie-parser');
 const user = require('./models/mongoose');
const app = express();
const path = require("path");
const mongoose = require("./models/mongoose");
const PORT = 3000;  // Define PORT

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
try {
  const alluser =  await user.find()
  res.render('index',{alluser});
} catch (error) {
 res.send(error) 
}
});
// console.log(mongoose.user.find());


app.get("/create", (req, res) => {
  res.render("create");
});
app.post("/create", async(req, res) => {
  try {
    let  {name,email,image} = req.body

  let users = await mongoose.create({
    name,
    email,
    image
  })

  res.redirect('/')
  } catch (error) {
    res.send(error)
  }
  
});

app.get('/update/:update_id',async (req, res) => {
  const data = await mongoose.findOne({_id : req.params.update_id})
  res.render("update",{data})
});

app.post('/update/:id',async (req, res) => {
  try {
    const {name,email,image} = req.body
    const update = await user.findOneAndUpdate({_id:req.params.id},{
      name,
      email,
      image
    },{
      new:true
    })
    res.redirect("/")
    // res.send(update)
  } catch (error) {
    res.send(`this is err ${error}`)
  }

  
});
app.use(cookieParser())
const bcrypt = require('bcrypt');
jwt = require('jsonwebtoken');
app.get('/cokkie', (req, res) => {
//  res.cookie('user', "kawish");

// bcrypt.genSalt(10, function(err, salt) {
//   bcrypt.hash("k", salt, function(err, hash) {
//       console.log(hash);
      
//   });
// });

// bcrypt.compare("k", "$2b$10$478LGg2n0ct1PjIIpwKvfeTbaY9iSCK1nnPNEWp3ccS8dgU.IqptK", function(err, result) {
// console.log(result)
// });



 res.send("work")
//  console.log(req.cookies);
 
});


app.get('/token', (req, res) => {
  // var token = jwt.sign({ email: 'kawishzia2826@gmail.com' }, 'k');
  // console.log(token);

  var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imthd2lzaHppYTI4MjZAZ21haWwuY29tIiwiaWF0IjoxNzQzMzI4MjIxfQ.ukMoVrzVt_SFgpeuVZt1TnKrJomQAE1TrvAcbgsoYPM", 'k');
console.log(decoded.email)
  
  res.send("token")
});
app.listen(PORT, () => 
  console.log(`App listnisng on port ${PORT}\nVisit: http://localhost:${PORT}`)
);
