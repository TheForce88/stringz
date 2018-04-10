var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RacquetSchema = new Schema({
  owner: String,
  stringer: String,
  brand: String,
  tension: Number,
  request: String,
  dropOffDay: [{ type: Schema.Types.ObjectId, ref: "Weekday"}],
  notes: String,
  img: String,
  completed: Boolean,
  inventoryItems: [{ type: Schema.Types.ObjectId, ref: "Inventory"}]
});

var Racquet = mongoose.model("Racquet", RacquetSchema);
module.exports = Racquet;
