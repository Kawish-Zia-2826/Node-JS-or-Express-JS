const express = require("express");
const app = express();
const path = require("path");
var csrf = require('csurf')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const csrfValidation = csrf({ cookie: true })

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => res.send("Hello World!"));

app.get('/form', csrfValidation,(req, res) => {
  res.render("form",{token: req.csrfToken()});
});

app.post('/submit', csrfValidation,(req, res) => {
  res.send('Form submitted successfully!');
});
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));