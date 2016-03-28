Restaurant.Collection.MaterialCategories.before.insert((userId, doc)=>{
  doc._id = idGenerator.gen(Restaurant.Collection.MaterialCategories,3);
});
