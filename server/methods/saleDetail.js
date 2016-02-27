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
  },
  detachSaleDetail(tableId, tableLocation, obj){
    let count = 1;
    let saleId, oldSaleId;
    for(let k in obj){
      if(count <= 1){
        saleId = insertSale(tableId, tableLocation, obj[k].saleDate);
        oldSaleId = obj[k].oldSaleId;
      }
      count++;
      Restaurant.Collection.SaleDetails.update(k, {$set: {saleId: saleId}});
    }
    Sale.sumSaleDetail(oldSaleId);
    return saleId;
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


let insertSale = (tableId, location, saleDate) => {
  let selector = {}
  var date = moment(saleDate).format('YYMMDD');
  selector._id = idGenerator.genWithPrefix(Restaurant.Collection.Sales, date, 3);
  selector.text = selector._id;
  selector.tableId = tableId;
  selector.tableLocation = location
  selector.saleDate = moment(saleDate).toDate();
  selector.status = 'active';
  selector.staff = Meteor.userId();
  var customerId = Restaurant.Collection.Customers.findOne({}, {sort: {_id: 1}})._id;
  selector.customerId = customerId;
  var id = "";
  var company = Restaurant.Collection.Company.findOne();
  if (company != null) {
      id = company.baseCurrency;
  }
  var exchangeRate = Restaurant.Collection.ExchangeRates.findOne({
      base: id,
  }, {sort: {_id: -1, createdAt: -1}});
  if (! exchangeRate) {
      throw new Meteor.Error("សូមមេត្តាបញ្ចូលអត្រាប្តូរប្រាក់");
  }else{
      selector.exchangeRateId = exchangeRate._id;
  }
  var restaurantId = Restaurant.Collection.Sales.insert(selector)
  return restaurantId;
}
