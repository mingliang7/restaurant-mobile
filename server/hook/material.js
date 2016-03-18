Restaurant.Collection.Materials.before.insert(function(userId, doc) {
  doc._id = idGenerator.gen(Restaurant.Collection.Materials, 3);
});