const express = require("express");
const dotenv = require('dotenv')
dotenv.config()
const app = express();
const path = require("path");
const cors = require('cors');
const { configDotenv } = require("dotenv");

app.use(cors())
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));


module.exports  = app