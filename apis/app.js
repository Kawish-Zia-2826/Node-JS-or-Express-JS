const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const routers = require("./router/route");
dotenv = require("dotenv").config();
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use('/api/users', routers);
app.listen(process.env.PORT, () => console.log(` app listening on port port! 3000 /n http://localhost:port `));