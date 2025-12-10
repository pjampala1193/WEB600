const express               = require('express'),
      expSession            = require('express-session'),
      app                   = express(),
      mongoose              = require('mongoose'),
      passport              = require('passport'),
      bodyParser            = require('body-parser'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User                  = require('./models/user');

// OWASP-related middlewares we will actually use
const rateLimit = require('express-rate-limit');
const helmet    = require('helmet');

//=======================
//   DATABASE CONNECTION
//=======================
mongoose.connect('mongodb://localhost/auth_demo');

//=======================
//      SESSIONS
//=======================
app.use(
  expSession({
    secret: 'mysecret',   // decode or encode session
    resave: false,
    saveUninitialized: true, // per homework: set this to true
    cookie: {
      httpOnly: true,           // helps mitigate XSS cookie theft
      maxAge: 1000 * 60 * 60,   // 1 hour
      sameSite: 'lax',          // CSRF protection helper
      secure: false             // set true only if using HTTPS
    }
  })
);

//=======================
//     PASSPORT CONFIG
//=======================
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());       // session encoding
passport.deserializeUser(User.deserializeUser());   // session decoding

//=======================
//    VIEW / BODY PARSER
//=======================
app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true,
    // OWASP: limit payload size to prevent DoS via large body
    limit: '10kb'
  })
);

//=======================
//   PASSPORT MIDDLEWARE
//=======================
app.use(passport.initialize());
app.use(passport.session());

//=======================
//    STATIC FILES
//=======================
app.use(express.static('public'));

//=======================
//      O W A S P
//=======================

// Simple sanitizer to help with XSS & injection in body/query
function sanitizeString(str) {
  // remove <, >, and $ characters (basic XSS / NoSQL injection mitigation)
  return str.replace(/[<>$]/g, '');
}

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (typeof value === 'string') {
      obj[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitizeObject(value);
    }
  }
}

// Apply sanitization to req.body and req.query
app.use((req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.query);
  next();
});

// Rate limiting to help prevent brute force / basic DoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Secure HTTP headers (includes extra protections like XSS headers, etc.)
app.use(helmet());

//=======================
//      R O U T E S
//=======================
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/userprofile', (req, res) => {
  res.render('userprofile');
});

// Auth Routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/userprofile',
    failureRedirect: '/login'
  }),
  function (req, res) {}
);

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  User.register(
    new User({
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone
    }),
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        return res.render('register');
      }
      passport.authenticate('local')(req, res, function () {
        res.redirect('/login');
      });
    }
  );
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

//=======================
//   START THE SERVER
//=======================
app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server Started At Port 3000');
  }
});
