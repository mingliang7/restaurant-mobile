Restaurant.Collection.Suppliers.before.insert((userId,doc) => {
  doc._id = idGenerator.gen(Restaurant.Collection.Suppliers, 3);  
});
