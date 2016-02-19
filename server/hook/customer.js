Restaurant.Collection.Customers.before.insert(function(userId, doc) {
  doc._id = idGenerator.gen(Restaurant.Collection.Customers, 6);
});
