var db = require('../models');

module.exports = {
  index: function(req, res){
    db.User.find({}, function(err, allUsers) {
      if(err){res.status(500).json({"ERROR":"Database Error"})}
      console.log("allUsers: \n", allUsers)
      res.json({"users": allUsers})
    });
  },

  show: function(req, res){
    var userId = req.params.id;
    db.User.findOne({_id: userId}, function(err, user) {
      if(err){res.json({success:false, message:"username not found"});}
      res.status(200).json({success: true, user: user});
    });
  },

  update: function(req, res){
    var updateUser = req.body;
    var userId = req.params.id
    db.User.findOneAndUpdate({_id: userId}, updatedUser, {new:true}, function(err, updatedUser){
      if(err){res.status(500).json({"ERROR":"Database Error"})}
      console.log("updatedUser: \n", updatedUser);
      res.status(200).json({"user": updatedUser})
    });
  },
  
  destroy: function(req, res){
    var userId = req.params.id
    db.user.remove({_id: userId}, function(err, removedUser){
      if(err){res.status(500).json({"ERROR":"Database Error"});}
      console.log("removedUser: \n", removedUser);
      res.status(200).json({"user": removedUser});
    });
  }
};
