Restaurant.Collection.Units.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.Units,3);
});