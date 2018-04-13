var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// heroku
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/newstringz');

// mongoose.connect('mongodb://localhost/newstringz', { promiseLibrary: global.Promise });

module.exports.User = require("./User");
module.exports.Racquet = require("./Racquet");
module.exports.Weekday = require("./Weekday");
module.exports.Inventory = require("./Inventory");
