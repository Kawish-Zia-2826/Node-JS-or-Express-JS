const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 
dotenv.config();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');


// Viw Engine
app.set('view engine', 'ejs');




mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/cms_project'
).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => console.log(err));  



app.use('/admin',(req,res,next)=>{
    res.locals.layout = 'admin/layout'
    next();
})
// Routes

app.use('/',require('./routes/frontend'))
app.use('/admin',require('./routes/admin'))

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
