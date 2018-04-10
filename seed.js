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
    request: "Nxt 16",
    notes: "Would like to pick up on Friday",
    img: "",
    completed: false
  },
  {
    owner: "Kyle Flask",
    brand: "Babolat",
    tension: 52,
    request: "Alu Power Soft 17",
    notes: "Requests one piece stringing",
    img: "",
    completed: true
  }
];

var weekdayList = [
  {day: "Monday"},
  {day: "Tuesday"},
  {day: "Wednsday"},
  {day: "Thursday"},
  {day: "Friday"},
  {day: "Saturday"},
  {day: "Sunday"}
];

var inventoryList = [
  {
    item: "Nxt 16",
    brand: "Wilson",
    category: "String",
    type: "Multifilament polyamide",
    typeShort: "Synthetic",
    color: "White",
    price: 14,
    onHand: 70,
    description: "Feel string. Good for anyone with tennis elbow, looking for a natural gut like performance with a synthetic construction."
  },
  {
    item: "RPM Blast 16",
    brand: "Babolat",
    category: "String",
    type: "Extruded co-polyester monofilament",
    typeShort: "Polyester",
    color: "Black",
    price: 24,
    onHand: 33,
    description: "Similar to Pro Hurricane Tour, but stiffer. Octagonal profile enhances spin generation, but gives less durability. Popular choice among strong baseliners seeking durability and spin to dictate the action."
  },
  {
    item: "Pro Hurricane Tour 16",
    brand: "Babolat",
    category: "String",
    type: "8-sided Monofilament Polyester",
    typeShort: "Polyester",
    color: "Yellow",
    price: 24,
    onHand: 61,
    description: "Pro Hurricane Tour is an excellent choice for big hitters looking for extra spin. Octagonal (8-sided) cross-section adds the extra bite on the ball for added topspin and slice. Firm feel and outstanding durability."
  },
  {
    item: "Alu Power Soft 17",
    brand: "Luxilon",
    category: "String",
    type: "Extruded Polyester Monofilament",
    typeShort: "Polyester",
    color: "Grey",
    price: 24,
    onHand: 30,
    description: "Power, control and durability are combined in this co-poly aluminum constructed string. Constructed with aluminum, the Big Banger ALU Power line creates a highly durable string with a softer feel and added playability. Almost no loss of tension. Recommended stringing 10% lower than usual."
  },
  {
    item: "Cushion Pro",
    brand: "",
    category: "Grip",
    type: "Replacement",
    typeShort: "",
    color: "Black",
    price: 10,
    onHand: 15,
    description: "Provides enhanced comfort plus shock absorption. This grip is ideal for players with tennis elbow."
  },
  {
    item: "Wilson Pro Overgrip",
    brand: "Wilson",
    category: "Grip",
    type: "Over",
    typeShort: "",
    color: "White",
    price: 6,
    onHand: 22,
    description: "Great for frequent players. Super thin, high stretch felt. Tapered starting end for easy application. Top choice of Wilson touring pros."
  },
];



// db.Racquet.remove({}, function(err) {
//   if(err) {
//     console.log('Error occured in remove', err);
//   } else {
//     console.log('removed all racquets');
//     db.Racquet.create(racquetsList, function(err, racquets) {
//       if (err) { return console.log('err', err); }
//       console.log("created", racquets.length, "racquets");
//     });
//   }
// });

db.Weekday.remove({}, function(err) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('removed all days');
    db.Weekday.create(weekdayList, function(err, weekdays) {
      if (err) { return console.log('err', err); }
      console.log("created", weekdays.length, "days");
    });
  }
});

db.Inventory.remove({}, function(err, inventory) {

  console.log("removed all inventory items");

  db.Inventory.create(inventoryList, function(err, inventory){
    if (err) {
      console.log(err);
      return;
    }

    console.log('reacreated all inventory items');
    console.log('stocked', inventory.length, 'inventory items');

    db.Racquet.remove({}, function(err, racquet){

      console.log('removed all racquets');

      racquetsList.forEach(function (racquetData) {
        var racquet = new db.Racquet({
          owner: racquetData.owner,
          brand: racquetData.brand,
          tension: racquetData.tension,
          notes: racquetData.note,
          img: racquetData.img,
          completed: racquetData.complete,
        });

        db.Inventory.find({ item: racquetData.request }, function(err, racquetInventory) {
          racquet.inventoryItems = racquetInventory;

          if (err) {
            console.log(err);
            return;
          }

          racquet.save(function(err, savedRacquet) {
            if (err) {
              return console.log(err);
            }
            console.log('saved ' + racquet.inventoryItems + ' to racquet for ' + savedRacquet.owner);
          });
        });
      });
    });
  });
});
