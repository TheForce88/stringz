var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String
});

UserSchema.methods.generateHash = function(password) {
  // Hash the password and salt it
  // It will never be seen again
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Authenticate the user
UserSchema.methods.validPassword = function(password) {
  // Hash the submitted password, and the salt
  // If it matches the hash in the database, then its valid
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;
