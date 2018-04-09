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
  console.log(req.body)
})

// GET login form (also available on homepage)
router.get('/login', function(req, res) {
  res.render('index', { user: req.user })
});

// POST login form
router.post('/login', passport.authenticate('local-login', function(info, user, err) {
  console.log(info);
    }),
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
