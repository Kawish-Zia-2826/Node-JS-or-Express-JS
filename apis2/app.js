const express = require("express");
const jwt  = require("jsonwebtoken");
const app = express();
const path = require("path");
const dbConnect = require('./config/config')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router  = require("./routes/route");
const MulterError = require('multer');
const cors = require('cors');
const auth  = require('./middleware/auth');
const userRoute = require('./routes/user.route')
app.use(cors());
app.use(express.static(path.join(__dirname, './uploads'))); // Serve static files from the uploads directory
dbConnect();
app.use('/api/users',userRoute)
app.use(auth)

app.use("/api/users", router);
const port = process.env.PORT

app.use((error,req,res,next)=>{
  if(error instanceof MulterError){
    return res.status(400).json({ message: error.message,code:error.code });
  }else if(error){
   return res.status(400).json({ message: error.message,code:error.code });
  }
  next();
})




app.get("/", (req, res) => res.json({"Hello World!": `"Welcome to the User Management API "`}));
app.listen(port, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));