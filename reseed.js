var db = require('./models/index');

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



db.Inventory.remove({}, function(err) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('removed all inventory items');
    db.Inventory.create(inventoryList, function(err, inventory) {
      if (err) { return console.log('err', err); }
      console.log("created", inventory.length, "inventory items");
    });
  }
});

db.Racquet.remove({}, function(err) {
  if(err) {
    console.log('Error occured in remove', err);
  } else {
    console.log('removed all racquets');
  }
});


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
