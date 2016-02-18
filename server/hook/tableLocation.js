Restaurant.Collection.TableLocations.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.TableLocations, 3);
});
