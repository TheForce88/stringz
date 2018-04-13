var express = require('express'),
    app = express(),
    router = express.Router();
    // session = require('express-session'),
    // passport = require('passport'),
    // LocalStrategy = require("passport-local").Strategy;

//Require models
var db = require('../models/index'),
      User = db.User,
      Racquet = db.Racquet,
      Inventory = db.Inventory;

// require('../config/auth')(passport);
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config');
var cookieParser = require('cookie-parser');
var verifyToken= require('../auth/VerifyToken');
// get config file

app.use(cookieParser());

// Website status check ...
router.get('/healthcheck', function(req, res) {
  console.log('Health check ...');
  res.send("Healthy");
});

// Homepage
router.get('/',verifyToken, function(req, res) {
  console.log(req.user); // not grabbing user on signup
  if(req.user){
    console.log(req.user);
    res.render('_home', { user: req.user ,auth:true })
  }else{
  res.render('_landing',{user:null});
}
});

router.get('/getProfile',verifyToken,  function(req, res) {
  if(!req.user){
    res.redirect('/')
  }
  res.render('profile',{user:req.user});
});

router.get('/getRacquets',verifyToken, function(req, res) {
  if(!req.user){
    res.redirect('/')
  }
  console.log('HERE ARE THE RACQUETS',req.user.racquets);
  Racquet.find({}, function(err, racquets){
    if (err) return res.status(500).send('Error on the server.');
    res.render('racquets',{user:req.user, racquets: racquets});
  })
});

router.get('/getInventory',verifyToken, function(req, res) {
  if(!req.user){
    res.redirect('/')
  }
  // console.log('HERES ALL THE INVENTORY', req.inventory);
  Inventory.find({}, function(err, inventory){
    if (err) return res.status(500).send('Error on the server.');
    res.render('inventory',{user:req.user, inventory:inventory});
  })
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
    res.cookie('token',token, {httpOnly:false});
    // return the information including token as JSON
    // res.status(200).send({ auth: true, token: token });
    res.redirect('/');
    // trying to redirect user to landing page, should work with above logic (get '/') but does not grab user...
  });

});

router.get('/logout', function(req, res) {
  res.cookie('token','');
  res.redirect('/');
});

router.post('/signup', verifyToken, function(req, res) {

  console.log(req.body.password)
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  console.log("THIS IS YOUR REC BODY NAME", req.body.name);

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

    // res.status(200).send({ auth: true, token: token });
    res.redirect('/');
  });

});

module.exports = router;
