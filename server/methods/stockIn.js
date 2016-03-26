Meteor.methods({
  removeStockIn(id){
     Restaurant.Collection.StockIn.remove(id);
  }
});
