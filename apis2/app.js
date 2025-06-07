const express = require("express");
const jwt  = require("jsonwebtoken");
const app = express();
const rateLimit  = require('express-rate-limit')
const path = require("path");
const dbConnect = require('./config/config')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router  = require("./routes/route");
const MulterError = require('multer');
const cors = require('cors');
const fs = require('fs');
const auth  = require('./middleware/auth');
const userRoute = require('./routes/user.route')
app.use(cors());
app.use(express.static(path.join(__dirname, './uploads'))); // Serve static files from the uploads directory
dbConnect();
const helmet  = require('helmet')
app.use('/api/users',userRoute)
app.use(auth)
app.use(helmet())

const limiter = rateLimit({
	windowMs:  60 * 1000, // 15 minutes
	limit: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	// standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	// legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: store + 1 , // Redis, Memcached, etc. See below.
  max:2,
  message:"Too many req try after 1 minute"
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

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

const folderPath = './uploads'; // Path to the new folder

fs.mkdir(folderPath, { recursive: true }, (err) => {
  if (err) {
    console.error('Error creating folder:', err);
  } else {
    console.log('Folder created successfully!');
  }
});



app.get("/", (req, res) => res.json({"Hello World!": `"Welcome to the User Management API "`}));
app.listen(port, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));