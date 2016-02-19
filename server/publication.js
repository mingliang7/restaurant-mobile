Meteor.publish("tableLocations", () =>{
  return Restaurant.Collection.TableLocations.find();
});

Meteor.publish('tables',() =>{
    return Restaurant.Collection.Tables.find();
});

Meteor.publish("customers", ()=> {
  return Restaurant.Collection.Customers.find();
});

Meteor.publish("notes", ()=> {
  return Restaurant.Collection.Notes.find();
});

Meteor.publish("staffs", ()=>{
  return Restaurant.Collection.Staffs.find();
});
