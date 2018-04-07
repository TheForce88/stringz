var mongoose = require('mongoose');
var User = require('./User');

mongoose.connect('mongodb://localhost/stringz', { promiseLibrary: global.Promise });

module.exports = {
  User: User
};
