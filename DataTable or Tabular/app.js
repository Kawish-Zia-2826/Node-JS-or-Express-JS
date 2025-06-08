const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/users.model');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connect MongoDB
mongoose.connect('mongodb+srv://kawish:kawishzia1234@cluster0.nwdrgwl.mongodb.net/student_managment_database')
.then(() => console.log('Database Connected!'));

// Get all users
app.get('/api/users', async (req, res) => {

  const users = await User.find();
  console.log(users);
  
  res.json({ data: users });
});

app.listen(3000, () => console.log('Server started'));