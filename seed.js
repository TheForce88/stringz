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
var racquetsList = [
  {
    owner: "Devin Smith",
    brand: "Wilson",
    tension: 56,
    inventoryItems: [
      "nxt 16",
      "RPM 16"
    ],
    notes: "Would like to pick up on Friday",
    img: "",
    completed: false
  },
  {
    owner: "Kyle Flask",
    brand: "Babolat",
    tension: 52,
    inventoryItems: [
      "Alu power 16"
    ],
    notes: "Requests one piece stringing",
    img: "",
    completed: true
  }
];

db.Racquet.remove({}, function(err) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('removed all racquets');
    db.Racquet.create(racquetsList, function(err, racquets) {
      if (err) { return console.log('err', err); }
      console.log("created", racquets.length, "racquets");
    });
  }
});
