const express = require("express");
const app = express();
const path = require("path");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));