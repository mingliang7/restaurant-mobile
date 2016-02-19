Meteor.publish("tableLocations", () =>{
  return Restaurant.Collection.TableLocations.find();
});

Meteor.publish('tables',() =>{
    return Restaurant.Collection.Tables.find();
});

Meteor.publish('units',()=>{
	return Restaurant.Collection.Units.find();
});
Meteor.publish('categories',()=>{
	return Restaurant.Collection.Categories.find();
});
Meteor.publish('products',()=>{
	return Restaurant.Collection.Products.find();
});
Meteor.publish('exchangeRates',()=>{
	return Restaurant.Collection.ExchangeRates.find();
});

Meteor.publish('images',()=>{
	return Images.find();
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
