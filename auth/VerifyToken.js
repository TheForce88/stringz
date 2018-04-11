var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file
var User = require('../models/User');
var cookieParser = require('cookie-parser');

function verifyToken(req, res, next) {
console.log(req.cookies.token);
  // check header or url parameters or post parameters for token
  var token = req.cookies.token;
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err){
      req.user=null;
      next();
    }
    else{
    // if everything is good, save to request for use in other routes
    let id = decoded.id;
    User.findOne({_id : id},function(err,found){

      if(!found)
      req.user=null
      else
      req.user=found;

        next();
    })
  }

  });

}

module.exports = verifyToken;
