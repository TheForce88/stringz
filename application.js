var express = require('express'),
    app = express(),
    logger = require('morgan'),
    // methodOverride = require("method-override"),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    ejsLayouts = require('express-ejs-layouts');
    // profile = require('./routes/profile.js');

// Require models
var db = require('./models/index'),
  User = db.User;


// Configure app
app.set('views', __dirname + '/views'); // Views directory
app.use(ejsLayouts);
app.use(express.static('public')); // Static directory
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // to use req.body
//
app.set('view engine', 'ejs');
//
// app.use(methodOverride("_method"));
//
app.use(cookieParser());

// Set CORS Headers
// app.use('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, Token");
//   res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, OPTIONS, DELETE');
//   next();
// });

// ROUTES
app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'));
// app.use('/api', require('./routes/api'));
//
// module.exports = app;

// GET PROFILE PAGE
// app.get('/', profile);

global.__root   = __dirname + '/';

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var UsersController = require(__root + 'controllers/usersController');
app.use('/api/users', UsersController);

var AuthController = require(__root + 'auth/AuthController');
app.use('/api/auth', AuthController);

// app.use('/', require('./routes/index'));

module.exports = app;
