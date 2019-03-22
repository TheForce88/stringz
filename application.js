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
  User = db.User,
  Racquet = db.Racquet;


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

global.__root   = __dirname + '/';

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

// User and Auth Controllers
var UsersController = require('./controllers/usersController');
app.use('/api/users', UsersController);

var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

var RacquetsController = require('./controllers/racquetsController');
// app.use('/api/racquets', RacquetsController);
app.get('/api/racquets', RacquetsController.index);
app.post('/api/racquets/', RacquetsController.create);
app.get('/api/racquets/:id', RacquetsController.show);
app.put('/api/racquets/:id', RacquetsController.update);
app.delete('/api/racquets/:id', RacquetsController.destroy);

var InventoryController = require('./controllers/inventoryController');
app.get('/api/inventory', InventoryController.index);
app.post('/api/inventory/', InventoryController.create);
app.get('/api/inventory/:id', InventoryController.show);
app.put('/api/inventory/:id', InventoryController.update);
app.delete('/api/inventory/:id', InventoryController.destroy);

// GET USER LOGIN/SIGNUP ROUTES
app.use('/', require('./routes/index'));


module.exports = app;
