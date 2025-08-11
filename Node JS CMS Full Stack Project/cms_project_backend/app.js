const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 
dotenv.config();
// var minifyHTML = require('express-minify-html-terser');
// var compression = require('compression');

// app.use(compression({
//     level:9,
//     threshold:10*1024
// }));

// app.use(minifyHTML({
//     override:      true,
//     exception_url: false,
//     htmlMinifier: {
//         removeComments:            true,
//         collapseWhitespace:        true,
//         collapseBooleanAttributes: true,
//         removeAttributeQuotes:     true,
//         removeEmptyAttributes:     true,
//         minifyJS:                  true
//     }
// }));
// Middleware
app.use(cookieParser());
app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({ extended: true ,limit:'10mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layout');
(express.static(__dirname + '/public'));

// Viw Engine
app.set('view engine', 'ejs');



// monoggose connection here
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

app.use('/admin',require('./routes/admin'))

app.use('/',require('./routes/frontend'))
app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
