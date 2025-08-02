const express = require("express");
const app = express();
const path = require("path");
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send(
   `<form action="/upload" method="POST">
    <input type="file" />
   </form>`
  )
}
);


app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));