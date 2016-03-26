Restaurant.Collection.StockIn.before.insert(function(userId, doc) {
  doc._id = idGenerator.gen(Restaurant.Collection.StockIn, 6);
});


Restaurant.Collection.StockIn.after.insert((userId,doc)=>{
});
