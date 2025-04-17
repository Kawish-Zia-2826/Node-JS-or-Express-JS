const express = require("express");
const app = express();
const path = require("path");
const multer  = require('multer')
const mimeTypesFilter = require('@meanie/multer-mime-types-filter');

app.use(express.json());
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


const { body, validationResult } = require('express-validator');
const { error } = require("console");

app.get("/", (req, res) => {
  res.render("form",{err:0});
});


let validation  = [
  body('name').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
  body('gender').isIn(["male","female"]).withMessage("gender is required")
]

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


function fileFilter (req, file, cb) {
if(file.mimetype.startsWith('image/')){
  cb(null, true)
}else{
  cb(new Error('Only images are allowed!'), false)
}

}


const upload = multer({ 
  storage: storage ,
  limits: { fileSize: 3000000 }, // 1MB limit
  fileFilter
})
app.post('/save', validation,upload.array('file',3),(req, res) => {

  // let err = validationResult(req);
  // if (err.isEmpty()) {
  //   res.send(req.body);
  
  // }
  // res.render("form",{err:err.array()});

  res.send(req.file);
});



app.use((err,req,res,next)=>{
  if (err instanceof multer.MulterError) {
    res.status(400).send(`Multer error: ${err.message}`);
    return;
  } else if (err) {
    res.status(500).send(`Error: ${err.message}`);
    return;

  }
  next();
}) 


app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));