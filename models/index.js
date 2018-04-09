var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/stringz', { promiseLibrary: global.Promise });

module.exports.User = require("./User");
