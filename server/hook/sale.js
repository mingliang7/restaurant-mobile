Restaurant.Collection.Sales.before.insert(function(user, doc) {

});

Restaurant.Collection.Sales.before.update(function(userId, doc) {
  console.log(doc.balanceAmount);
  doc.balanceAmount = doc.total;
});
