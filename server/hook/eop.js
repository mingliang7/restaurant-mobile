Restaurant.Collection.EndOfProcess.before.insert((userId, doc) => {
  Restaurant.ReactiveState.Eop.set(doc._id, false); //set wait for client when eop request
  doc._id = idGenerator.gen(Restaurant.Collection.EndOfProcess, 6);
  let tmpStartDate = moment(doc.startEopDate);
  let tmpEndDate = moment(doc.endEopDate).add('1', 'days');
  let startDate = moment(tmpStartDate).toDate();
  let endDate = moment(tmpEndDate).toDate();
  console.log(startDate, endDate);
  findClosedSale(doc._id, startDate, endDate);
});


let findClosedSale = (id, startDate, endDate) => {
  let saleObj = {};
  let sales = Restaurant.Collection.Sales.find({
    saleDate: {
      $gte: startDate,
      $lt: endDate
    },
    eop: false,
    $or: [{
      status: 'closed'
    }, {
      status: 'partial'
    }]
  });
  console.log(sales.fetch());
  if (sales.count() > 0) {
    sales.forEach((sale) => {
      let date = moment(sale.saleDate).format('YYYY-MM-DD');
      if (_.isUndefined(saleObj[date])) {
        saleObj[date] = extractNewProduct(sale._id, {});
      } else {
        saleObj[date] = extractNewProduct(sale._id, saleObj[date]);
      }
    });
    Meteor.defer(() => {
      reduceStock(saleObj);
    });
  } else {
    Restaurant.Collection.EndOfProcess.remove(id);
  }

};


let extractNewProduct = (saleId, productObj) => {
  let product = productObj;
  let saleDetails = Restaurant.Collection.SaleDetails.find({
    saleId: saleId
  });
  saleDetails.forEach((saleDetail) => {
    saleDetail._product.ingradient.forEach((ingradient) => {
      if (_.isUndefined(product[ingradient.productId])) {
        product[ingradient.productId] = {
          qty: ingradient.qty * saleDetail.quantity,
          saleId: [saleId]
        };
      } else {
        product[ingradient.productId].qty += ingradient.qty * saleDetail.quantity;
        product[ingradient.productId].saleId.push(saleId);
      }
    });
  });
  return product;
};


let reduceStock = (saleObj) => {
  console.log(saleObj, 'reduce stock here');
  for (let k in saleObj) { //extract obj by day
    for (let j in saleObj[k]) { //extrach productId, and quantity
      let stockIn = Restaurant.Collection.StockIn.findOne({
        materialId: j
      });
      let tmpQty = stockIn.qty - saleObj[k][j].qty;
      Restaurant.Collection.StockIn.update(stockIn._id, {
        $set: {
          qty: tmpQty
        }
      });
      Restaurant.Collection.Materials.update(j, {
        $push: {
          _outstandingAmount: {
            reduceStockId: stockIn._id,
            reduceStockDate: k,
            qty: tmpQty
          }
        }
      });
      for (let i = 0; i < saleObj[k][j].saleId.length; i++) {
        Restaurant.Collection.Sales.direct.update({
          _id: saleObj[k][j].saleId[i]
        }, {
          $set: {
            eop: true
          }
        });
      }
    }
  }
};
