var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
  // racquets: [{ type: Schema.Types.ObjectId, ref: "Racquet"}]
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;
