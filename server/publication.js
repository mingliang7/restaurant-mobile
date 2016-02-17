Meteor.publish("tableLocations", () =>{
  return Restaurant.Collection.TableLocations.find();
});

Meteor.publish('tables',() =>{
    return Restaurant.Collection.Tables.find();
});
