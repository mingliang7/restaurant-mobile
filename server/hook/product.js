Restaurant.Collection.Products.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.Products, 7);
});