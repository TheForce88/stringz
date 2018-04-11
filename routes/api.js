// var express = require('express'),
//     router = express.Router(),
//     db = require('../models/index'),
//     apiDocs = require('../docs/api.json');

// GET documentation
// router.get('/', function(req, res) {
//   console.log('Api is working!');
//   res.status(200).json(apiDocs);
// });

// Users API
// routes for user api

// GET /api/users
// router.get('/users', function(req, res) {
//   db.User.find({}, function(err, users) {
//     if (err) {
//       console.log(err);
//       res.status(400).json(err);
//     } else {
//       console.log('All users fetched.');
//       res.status(200).json(users);
//     }
//   })
// });

// GET /api/user
// router.get('/users/:id', function(req, res) {
//   db.User.findOne(req.body.id, function(err, user) {
//     if (err) {
//       console.log(err);
//       res.status(400).json(err);
//     } else {
//       console.log('User found...');
//       res.status(200).json(user);
//     }
//   })
// });

// CREATE /api/users/new
router.post('/users/new', function(req, res) {
  var password = req.body.password;
  var usr = new db.User(req.body);
  usr.encrypt(usr.password);
  usr.save(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('User created...');
      res.status(201).json(user);
    }
  })
});

// DELETE /api/user
router.delete('/users/:id', function(req, res) {
  db.User.remove(req.body.id, function(err) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: 'Could not remove.' });
    } else {
      console.log("User removed.");
      res.status(200).redirect('/');
      // redirect to home page after delete
    }
  })
});

module.exports = router;
