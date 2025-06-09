const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv')
dotenv.config()
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.set('view engine', 'ejs');


const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
 try {
 const transporter = nodemailer.createTransport({
 host: process.env.HOST,
 
port: 587,
secure: false,
auth: {
user: process.env.USER,
pass: process.env.PASS,
}, });
// const file = path.resolve(text.txt)
const result = await transporter.sendMail({
 from: process.env.USER,
 to: email,
subject: subject,
text: text,
attachments:[
  {filename: 'text.txt'}
] });

console.log("email sent sucessfully");

return result
} catch (error) {

 console.log(error, "email not sent"); }
 };

 
app.get("/", (req, res) => {
  res.render('node_mail.ejs')
});

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    const mail = await sendEmail(to, subject, text);
    res.status(200).send({ message: "Email sent successfully", mail });
  } catch (error) {
    res.status(500).send({ message: "Failed to send email", error });
  }
});
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));