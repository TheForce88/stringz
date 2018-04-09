// var faker = require('faker');
// var db = require('./models/index');
// var count = 5;
//
// db.User.remove({}).then(function() {
//   for(var i=0; i < count; i++) {
//     db.User.create({username: faker.internet.userName(), email: faker.internet.email(), password: faker.internet.password}, function(err, user) {
//       if (err) { console.log(err) };
//     })
//   }
// });

var db = require('./models/index');
var usersList = [
  {
    username: "elaine",
    email: "elaine@gmail.com",
    password: "123"
  },
  {
    username: "john",
    email: "doe@gmail.com",
    password: "456"
  }
];

db.User.remove({}, function(err, users) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('removed all users');

    db.User.create(usersList, function(err, users) {
      if (err) { return console.log('err', err); }
      console.log("created", users.length, "users");
    });
  }
});
