Restaurant.Collection.Products.before.insert(function (userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.Products, 7);
});

Restaurant.Collection.Products.after.insert((userId, doc)=>{
  Meteor.call('updateTag', doc.categoryId, doc._id);
  Meteor.call('pushUnitToCategory', doc._id);
});

Restaurant.Collection.Products.after.update((userId, doc)=>{
  Meteor.call('updateTag', doc.categoryId, doc._id, true);
  Meteor.call('pushUnitToCategory', doc._id);
});
