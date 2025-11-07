const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Registration = mongoose.model('Registration');
const { check, validationResult } = require('express-validator');

router.get('/', function(req, res)  {
     res.render('form', { title: 'Registration Form' });
//   res.send('It works!');
//     res.render('form', { title: 'Registration Form' });
});

router.post('/', 
    [
        check('name')
        .isLength({min:1})
        .withMessage('Please enter a name'),
        check ('email')
        .isLength({min:1})
        .withMessage('Please enter an email'),
    ],
   function (req, res) {
    console.log(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()){
        const registration = new Registration(req.body);
        registration.save()
          .then(() => {res.send('Thank you for your Registration');})
          .catch((err) => {
            console.log(err);
 