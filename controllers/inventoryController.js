var db = require('../models');
const async = require("async");

module.exports = {
  index: function(req,res){
    db.Inventory.find({}, function(err, allInventoryItems){
      if(err){res.status(500).json({"ERROR":"Database Error"})}
      // console.log("allInventoryItems: \n", allInventoryItems)
      res.json({"inventoryItems": allInventoryItems})
    });
  },

  show: function(req,res){
    var inventoryId = req.params.id;
    db.Inventory.findOne({_id: inventoryId}, function(err, foundInventoryItem){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("foundInventoryItem: \n", foundInventoryItem);
      res.status(200).json({"inventoryItem": foundInventoryItem});
    });
  },

  create: function(req, res){
    var newInventoryItem = req.body;
    db.Inventory.create(newInventoryItem, function(err, newInventoryItem){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("newInventoryItem: \n", newInventoryItem);
      res.status(200).json({"inventoryItem": newInventoryItem});
    });
  },

  update: function(req, res){
    var updatedInventoryItem = req.body;
    var inventoryId = req.params.id
    db.Inventory.findOneAndUpdate({_id: inventoryId}, updatedInventoryItem, {new:true}, function(err, updatedInventoryItem){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("updatedInventoryItem: \n", updatedInventoryItem);
      res.status(200).json({"inventoryItem": updatedInventoryItem});
    });
  },

    destroy: function(req, res){
    var inventoryId = req.params.id
    db.Inventory.remove({_id: inventoryId}, function(err, removedInventoryItem){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("removedInventoryItem: \n", removedInventoryItem);
      res.status(200).json({"inventoryItem": removedInventoryItem});
    });
  }
}
