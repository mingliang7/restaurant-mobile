Restaurant.Collection.Inventory.before.insert(function(userId, doc) {
  doc._id = idGenerator.gen(Restaurant.Collection.Inventory, 9);
});
