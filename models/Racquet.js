var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RacquetSchema = new Schema({
  owner: String,
  stringer: String,
  brand: String,
  tension: Number,
  // inventoryItems: Array,
  notes: String,
  img: String,
  completed: Boolean,
  inventoryItems: [{ type: Schema.Types.ObjectId, ref: "Inventory"}]
});

var Racquet = mongoose.model("Racquet", RacquetSchema);
module.exports = Racquet;
