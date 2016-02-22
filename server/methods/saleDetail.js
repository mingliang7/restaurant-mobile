Meteor.methods({
  insertSaleDetail(selector) {
    var saleDetails = [];
    for (let k in selector) {
      saleDetails.push(selector[k]);
    }
    var sale = Restaurant.Collection.Sales.findOne(saleDetails[0].saleId);
    if(_.isUndefined(sale.total)){
      saleDetails.forEach((saleDetail) => {
        saleDetail._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 2);
        Restaurant.Collection.SaleDetails.insert(saleDetail);
      });
    }
    //update saleDetail by Id
    //update sale
    Meteor.defer(() => {
      let subTotal = 0;
      let saleId = '';
      let customerId = Restaurant.Collection.Customers.findOne({}, {
        sort: {
          _id: 1
        }
      })._id;
      saleDetails.forEach((saleDetail) => {
        saleId = saleDetail.saleId;
        subTotal += saleDetail.amount;
      })
      Restaurant.Collection.Sales.direct.update(saleId, {$set: {total: subTotal, subTotal: subTotal, customerId: customerId}});
    });
  }
});
