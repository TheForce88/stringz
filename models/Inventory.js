var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var InventorySchema = new Schema({
  item: String,
  brand: String,
  category: String,
  type: String,
  typeShort: String,
  color: String,
  price: Number,
  onHand: Number,
  description: String
});

var Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
