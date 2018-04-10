var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WeekdaySchema = new Schema({
  day: String
});

var Weekday = mongoose.model("Weekday", WeekdaySchema);
module.exports = Weekday;
