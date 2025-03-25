 // ✅ Correct
import {call} from './config/database.js'

import express from "express";
import ContactRoutes from "./routes/contact.routes.js"
const app = express();
const port   = process.env.PORT
app.listen(port, () => {
  console.log("route is working");
});
call()

app.set("view eingine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use('/',ContactRoutes)
 


