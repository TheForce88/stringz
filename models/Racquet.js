var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RacquetSchema = new Schema({
  owner: String,
  stringer: String,
  brand: String,
  tension: Number,
  inventoryItems: Array,
  notes: String,
  img: String,
  completed: Boolean
});

var Racquet = mongoose.model("Racquet", RacquetSchema);
module.exports = Racquet;
