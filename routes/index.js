var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy;

// Require models
var db = require('../models/index'),
      User = db.User;

// require('../config/auth')(passport);


// Website status check ...
router.get('/healthcheck', function(req, res) {
  console.log('Health check ...');
  res.send("Healthy");
});

// Homepage
router.get('/', function(req, res) {
  res.render('index', { user: req.user })
});

// LOGIN and SIGNUP Routes
// using passport to authenticate

// GET signup form
router.get('/signup', function(req, res) {
  res.render('users/new', { user: req.user })
});

// POST signup form
// router.post('/signup', function(req, res, next) {
//   passport.authenticate('local-signup',
//   {successRedirect: '/', failureRedirect: '/signup'}
//   )
// });

router.post('/signup', function(req, res) {
  User.register(new User({ username: req.body.username, }), req.body.password,
    function () {
      passport.authenticate("local")(req, res, function() {
        // res.send("Signed up!!!");
        res.redirect("/");
      });
    }
  );
});

// GET login form (also available on homepage)
router.get('/login', function(req, res) {
  console.log("getting login page...");
  res.render('index', { user: req.user })
});

// POST login form
router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("about to athenticate user...");
  // console.log(req.user);
  res.send("logged in!!!"); // sanity check; take out later
  // res.redirect('/');
});

// GET logout link
router.get('/logout', function(req, res) {
  console.log("BEFORE logout", JSON.stringify(req.user));
  req.logout();
  console.log("AFTER logout", JSON.stringify(req.user));
  res.redirect('/');
});

module.exports = router;
