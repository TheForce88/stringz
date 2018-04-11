var express = require('express'),
    router = express.Router();
    // session = require('express-session'),
    // passport = require('passport'),
    // LocalStrategy = require("passport-local").Strategy;

//Require models
var db = require('../models/index'),
      User = db.User;

// require('../config/auth')(passport);
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config');
var cookieParser = require('cookie-parser');
var verifyToken= require('../auth/VerifyToken');
// get config file

// Website status check ...
router.get('/healthcheck', function(req, res) {
  console.log('Health check ...');
  res.send("Healthy");
});

// Homepage
router.get('/',verifyToken, function(req, res) {
  if(req.user){
    res.render('index', { user: req.user ,auth:true})
  }
  res.render('index',{user:req.user});

});


router.post('/login',verifyToken, function(req, res) {
if(req.user)
res.redirect('/');
  User.findOne({ email: req.body.email }, function (err, user) {
    console.log(req.body.email);
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    console.log(token);
    res.cookie('token',token);
    // return the information including token as JSON
    // res.status(200).send({ auth: true, token: token });
    res.render('index', { auth: true, user: token });

    // res.redirect("/");
  });

});

router.get('/logout', function(req, res) {
  res.cookie('token','');
  res.redirect('/');
});

router.post('/signup', function(req, res) {

  console.log(req.body.password)
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.");

    // if user is registered without errors
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

});

// LOGIN and SIGNUP Routes
// using passport to authenticate

// GET signup form
// router.get('/signup', function(req, res) {
//   res.render('users/new', { user: req.user })
// });

// POST signup form
// router.post('/signup', function(req, res, next) {
//   passport.authenticate('local-signup',
//   {successRedirect: '/', failureRedirect: '/signup'}
//   )
// });

// router.post('/signup', function(req, res) {
//   User.register(new User({ username: req.body.username, }), req.body.password,
//     function () {
//       passport.authenticate("local")(req, res, function() {
//         // res.send("Signed up!!!");
//         res.redirect("/");
//       });
//     }
//   );
// });

// GET login form (also available on homepage)
// router.get('/login', function(req, res) {
//   console.log("getting login page...");
//   res.render('index', { user: req.user })
// });

// POST login form
// router.post('/login', passport.authenticate('local'), function(req, res) {
//   console.log("about to athenticate user...");
//   // console.log(req.user);
//   res.redirect('/');
// });

// GET logout link
// router.get('/logout', function(req, res) {
//   console.log("BEFORE logout", JSON.stringify(req.user));
//   req.logout();
//   console.log("AFTER logout", JSON.stringify(req.user));
//   res.redirect('/');
// });

module.exports = router;
