Restaurant.Collection.Sales.before.insert(function(user, doc) {

});

Restaurant.Collection.Sales.before.update(function(userId, doc) {
  doc.balanceAmount = doc.total;
});
