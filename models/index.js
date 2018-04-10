var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/newstringz', { promiseLibrary: global.Promise });

module.exports.User = require("./User");
module.exports.Racquet = require("./Racquet");
module.exports.Weekday = require("./Weekday");
module.exports.Inventory = require("./Inventory");
