const express = require("express");
const app = express();
var session = require('express-session')
var passport = require('passport')
require('./goggle')

// middleware


app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}))



app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) =>{
  res.send("<a href='/auth/google'>Login with Google</a>");
} );

app.get('/auth/google',
  passport.authenticate('google', {
     scope: ['profile']
     }));
 
app.get("/auth/home", 
  passport.authenticate('google', 
    {
       failureRedirect: '/',
        successRedirect: '/profile'

      }),
  );


  app.get('/profile', (req, res) => {
    if(!req.isAuthenticated()) {
      return res.redirect('/');
    }
    console.log(req.user);
    
    res.send(`<h1>Welcome ${req.user.displayName}</h1>
              <p><img src="${req.user._json.picture}" alt="Profile Picture"></p>
              <a href="/logout">Logout</a>`);
  });

  app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });
app.listen(3000, () => console.log(` app listening on port port! 3000 /n http://localhost:port`));{}