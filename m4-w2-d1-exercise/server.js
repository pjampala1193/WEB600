const express = require('express');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const session = require('express-session');
const path = require('path');
const db = require('./db');

const app = express();

// View engine setup (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));

// Session + Passport setup
app.use(
  session({
    secret: 'change-this-secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy
passport.use(
  new Strategy(function (username, password, cb) {
    db.users.findByUsername(username, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password !== password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

// Serialize / deserialize
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Routes

// Home (requires login, but we just show user if logged in)
app.get('/home', function (req, res) {
  res.render('home', { user: req.user });
});

// Login page
app.get('/login', function (req, res) {
  res.render('login');
});

// Login form submit
app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

// Logout
app.get('/logout', function (req, res) {
  req.logout(function () {
    res.redirect('/');
  });
});

// Root route
app.get('/', function (req, res) {
  res.render('home', { user: req.user });
});

// Start server
app.listen(3000, function () {
  console.log('Server running on http://localhost:3000');
});
