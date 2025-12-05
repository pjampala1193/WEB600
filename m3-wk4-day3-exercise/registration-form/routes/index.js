const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

// show registration form
router.get('/', (req, res) => {
  res.render('form', { title: 'Registration form' });
});

// protected list of registrations
router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .sort({ createdAt: -1 })
    .then((registrations) => {
      res.render('index', {
        title: 'Listing registrations',
        registrations,
      });
    })
    .catch(() => {
      res.send('Sorry! Something went wrong.');
    });
}));

// handle form submit
router.post(
  '/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email'),
    check('username')
      .isLength({ min: 1 })
      .withMessage('Please enter a username'),
    check('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }

    try {
      // hash password before saving
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const registration = new Registration({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
      });

      await registration.save();
      res.send('Thank you for your registration!');
    } catch (err) {
      console.log(err);
      res.send('Sorry! Something went wrong.');
    }
  }
);

module.exports = router;
