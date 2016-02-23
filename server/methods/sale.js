Meteor.methods({
  insertSale(selector) {
    var date = moment(selector.saleDate).format('YYMMDD');
    selector._id = idGenerator.genWithPrefix(Restaurant.Collection.Sales, date, 3);
    selector.text = selector._id;
    var customerId = Restaurant.Collection.Customers.findOne({}, {sort: {_id: 1}})._id;
    selector.customerId = customerId;
    var restaurantId = Restaurant.Collection.Sales.insert(selector);
    return restaurantId;
  },
  removeSaleIfNoSaleDetailExist(saleId){
    console.log(saleId);
    Meteor.defer(()=> {
      Meteor._sleepForMs(500);
      let saleDetails = Restaurant.Collection.SaleDetails.find({saleId: saleId});
      if(saleDetails.count() <= 0 ) {
        Restaurant.Collection.Sales.direct.remove(saleId);
      }
    });
  }
});
