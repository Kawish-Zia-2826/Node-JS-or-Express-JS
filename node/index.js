const express = require("express");
const app = express();
const fs = require('fs')
const path = require("path");
// middleware
app.use(express.json())
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const folderName = __dirname + "/files";
try {
  if (fs.existsSync(folderName)) {
    // fs.mkdirSync(folderName);
    var filee  = fs.readdirSync(folderName);

    console.log(filee);
    
  }
} catch (err) {
  console.error(err);
}




app.get("/", (req, res) => 
{

res.render('index',{filee});
})

app.post('/create',(req,res)=>{
  // res.json(req.body.desc)
  fs.writeFile(__dirname + "/files/"+req.body.title.split(" ").join(""),req.body.desc,(err)=>{
console.log(err);


  }

)

res.redirect('/');
})
app.listen(3000, () => console.log(` apppp listening on port port! 3000 /n http://localhost:port`));