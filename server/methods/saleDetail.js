Meteor.methods({
  insertSaleDetail(selector) {
    var saleDetails = [];
    for (let k in selector) {
      saleDetails.push(selector[k]);
    }
    var sale = Restaurant.Collection.Sales.findOne(saleDetails[0].saleId);
    if (_.isUndefined(sale.total)) {
      Meteor.defer(()=>{
        Meteor._sleepForMs(200);
        saleDetails.forEach((saleDetail) => {
          saleDetail._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 2);
          Restaurant.Collection.SaleDetails.insert(saleDetail);
        });
      })
    } else {
      Meteor.defer(() => {
        saleDetails.forEach(function(saleDetail) {
          let existSaleDetail = Restaurant.Collection.SaleDetails.findOne({
            saleId: saleDetail.saleId,
            productId: saleDetail.productId
          });
          if (!existSaleDetail) {
            saleDetail._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 2);
            Restaurant.Collection.SaleDetails.insert(saleDetail);
          } else {
            updateExistSaleDetail(saleDetail, existSaleDetail);
          }
        });
      })

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
      Restaurant.Collection.Sales.direct.update(saleDetails[0].saleId, {
        $set: {
          customerId: customerId
        }
      });
    });
  },
  removeSaleDetail(id) {
    Restaurant.Collection.SaleDetails.remove(id);
  }
});

var updateExistSaleDetail = (currentSaleDetail, existSaleDetail) => {
  let newQty = currentSaleDetail.quantity + existSaleDetail.quantity;
  let totalAmount = (newQty * existSaleDetail.price) * (1 - existSaleDetail.discount / 100);
  Restaurant.Collection.SaleDetails.update(existSaleDetail._id, {
    $set: {
      amount: totalAmount,
      quantity:newQty
    }
  })
}
