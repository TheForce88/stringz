var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  workerTypeIsStringer: Boolean,
  racquets: [{ type: Schema.Types.Array, ref: "Racquet"}],
  workdays: [{ type: Schema.Types.ObjectId, ref: "Weekday"}]
});

// UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema);
module.exports = User;
