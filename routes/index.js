var express = require('express'),
    router = express.Router(),
    passport = require('passport');

require('../config/auth')(passport);


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
router.get('/', function(req, res) {
  res.render('index', { user: req.user })
});

// GET signup form
router.get('/', function(req, res) {
  res.render('users/new', { user: req.user })
});

// POST signup form
router.post('/signup', function(req, res, next) {
  passport.authenticat('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
  })
});

// GET login form (also available on homepage)
router.get('/login', function(req, res) {
  res.render('/login')
});

// POST login form
router.get('/login', passport.authenticate('local-login'),
  function(req, res) {
    res.render('index', { user: req.user })
  }
);

// GET logout link
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/')
});

module.exports = router;
