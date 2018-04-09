var express = require('express'),
    app = express(),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    passport = require('passport'),
    db = require('./models/index');

// Configure app
app.set('views', __dirname + '/views'); // Views directory
app.use(express.static('public')); // Static directory
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true })); // to use req.body

app.set('view engine', 'ejs');

app.use(session({
  secret: 'revelio',
  reseve: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Set CORS Headers
// app.use('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, Token");
//   res.header("Access-Control-Allow-Methods", 'PUT, POST, GET, OPTIONS, DELETE');
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());
require('./config/auth')(passport);

// ROUTES
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/api', require('./routes/api'));

module.exports = app;
