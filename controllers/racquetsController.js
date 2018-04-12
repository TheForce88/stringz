var db = require('../models');
const async = require("async");

module.exports = {
  index: function(req,res){
    db.Racquet.find({}, function(err, allRacquets){
      if(err){res.status(500).json({"ERROR":"Database Error"})}
      console.log("allRacquets: \n", allRacquets)
      res.json({"racquets": allRacquets})
    });
  },

  show: function(req,res){
    var racquetId = req.params.id;
    db.Racquet.findOne({_id: racquetId}, function(err, foundRacquet){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("foundRacquet: \n", foundRacquet);
      res.status(200).json({"racquets": foundRacquet});
    });
  },

  create: function(req, res){
    var newRacquet = req.body;
    console.log(req.body);
    db.User.findOne({name:req.body.stringer.toLowerCase()},function(err,found){
      console.log(found);
      if(!found){
        res.status(500).json({message:'not found'})
      }else{
        newRacquet.stringer=found
        db.Racquet.create(newRacquet, function(err, newRacquet){
          if(err){res.status(500).json({"ERROR":"Database Error"});}
          console.log("newRacquet: \n", newRacquet);
          res.status(200).json({"racquet": newRacquet});
        });
      }
    })

  },

  update: function(req, res){
    var updatedRacquet = req.body;
    var racquetId = req.params.id
    db.Racquet.findOneAndUpdate({_id: racquetId}, updatedRacquet, {new:true}, function(err, updatedRacquet){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("updatedRacquet: \n", updatedRacquet);
      res.status(200).json({"racquet": updatedRacquet});
    });
  },

  destroy: function(req, res){
    var racquetId = req.params.id
    db.Racquet.remove({_id: racquetId}, function(err, removedRacquet){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("removedRacquet: \n", removedRacquet);
      res.status(200).json({"racquet": removedRacquet});
    });
  }
}
