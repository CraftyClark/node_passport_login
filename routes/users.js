const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Parser = require('rss-parser');

// User model
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Handle Register
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Check required fields
    if(!name || ! email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // Check passwords are the same
    if(password !== password2) {
        errors.push({ msg: 'Passwords do not match'});
    }

    // Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Choose a password at least 6 characters long'});
    }

    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        // Validation passed
        // Mongoose method to fine one record, returns a promise
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({ msg: 'Email address is already registered' });
                    // User exists
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                }
                else {
                    const newUser = new User ({
                        name,
                        email, 
                        password
                    });

                    // Hash password with bcrypt
                    bcrypt.genSalt(10, (err, salt) => 
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            // Set password as hashed password
                            newUser.password = hash;
                            // Save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered, please log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => console.log(err));
                    }));
                }
            });
    }
});

// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });
  
// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
});

// Dashboard Page
router.get('/dashboard', (req, res) => res.render('dashboard'));

// Handle Dashboard
router.post('/dashboard', (req, res, next) => {

    const { link } = req.body;

    passport.authenticate('local', (err, user, info) => {
        /* // Test logs
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        */

    let newUser = new User(req.user);
    console.log('new user email');
    console.log(newUser);
    newUser.save().then(function(){
        User.findOne({email: newUser.email}).then(function(record){
            record.urls.push({link: link}); 
            record.save().then(user => {
                req.flash('success_msg', 'You have successfully submitted a new link');
                res.redirect('/dashboard');
            })
            .catch(err => console.log(err));
        });
    });


      })(req, res, next);

    
});

module.exports = router;