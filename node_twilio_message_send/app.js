const express = require("express");
const app = express();
const path = require("path");
const dotenv = require('dotenv')

dotenv.config()
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_Auth_Token;

const client = require('twilio')(accountSid, authToken);

;



app.get("/", (req, res) => res.render("twilio_sms.ejs"));
app.post('/send-sms', (req, res) => {
  const {to,message} = req.body;
  try {
    
    client.messages
  .create({
    body: message,
    to: to, // Text your number
    from: process.env.TWILIO_PHONE_NUM, // From a valid Twilio number
  })
  .then((message) => {
    res.status(200).send({message:message.sid})
    console.log(message.sid)
  }
  )
  
  
  } catch (error) {
    res.status(400).send({message:error.message})
  }
});

app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));