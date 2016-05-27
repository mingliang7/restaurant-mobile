Meteor.methods({
    insertSaleDetail(selector) {
        var saleDetails = [];
        for (let k in selector) {
            saleDetails.push({
                saleId: selector[k].saleId,
                productId: selector[k]._id,
                discount: selector[k].discount,
                amount: selector[k].amount,
                quantity: selector[k].quantity,
                price: selector[k].price
            });
        }
        console.log(saleDetails)
        var sale = Restaurant.Collection.Sales.findOne(saleDetails[0].saleId);
        if (_.isUndefined(sale.total)) {
            Meteor.defer(() => {
                Meteor._sleepForMs(200);
                saleDetails.forEach((saleDetail) => {
                    saleDetail._id = idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleDetail.saleId, 2);
                    saleDetail.transferOrSplit = false;
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
    detachSaleDetail(tableId, tableLocation, obj) { //បំបែកវិក័យប័ត្រ
        Meteor._sleepForMs(200);
        let count = 1;
        let saleId, oldSaleId;
        for (let k in obj) {
            if (count <= 1) {
                saleId = insertSale(tableId, tableLocation, obj[k].saleDate, obj[k].numberOfCustomer);
                oldSaleId = obj[k].oldSaleId;
            }
            count++;
            if (obj[k].qtyChanged) {
                let saleDetail = Restaurant.Collection.SaleDetails.findOne(k);
                let newSaleDetail = {
                    _id: idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, saleId, 2),
                    price: saleDetail.price,
                    quantity: obj[k].qtyChanged,
                    discount: obj[k].discount,
                    amount: (obj[k].qtyChanged * saleDetail.price) * (1 - obj[k].discount / 100),
                    productId: saleDetail.productId,
                    saleId: saleId,
                    transferOrSplit: true
                }
                Restaurant.Collection.SaleDetails.insert(newSaleDetail);
                Meteor.defer(() => {
                    let remainQty = obj[k].defaultQty - obj[k].qtyChanged;
                    Restaurant.Collection.SaleDetails.update(k, {
                        $set: {
                            quantity: remainQty,
                            discount: saleDetail.discount,
                            amount: (remainQty * saleDetail.price) * (1 - saleDetail.discount / 100)
                        }
                    })
                });
            } else {
                Restaurant.Collection.SaleDetails.update(k, {
                    $set: {
                        saleId: saleId,
                        transferOrSplit: true
                    }
                });
            }
        }
        Meteor.defer(function() {
            Sale.sumSaleDetail(oldSaleId);
        })
        return saleId;
    },
    mergeSaleInvoice(currentSaleId, selectedSaleId) { //ផ្ទេរវិក័យប័ត្រ
        Meteor._sleepForMs(200);
        let saleDetails = Restaurant.Collection.SaleDetails.find({
            saleId: currentSaleId
        });
        saleDetails.forEach(function(saleDetail) {
            dupplicatedSaleDetail(saleDetail);
            Restaurant.Collection.SaleDetails.update({
                _id: saleDetail._id
            }, {
                $set: {
                    saleId: selectedSaleId,
                    transferOrSplit: true
                }
            }, {
                multi: true
            });
        });
        Restaurant.Collection.Sales.direct.update(currentSaleId, {
            $set: {
                status: 'transfer',
                refId: selectedSaleId
            }
        });
    },
    transferItem(transferSaleId, currentSaleId, obj) {
        Meteor._sleepForMs(200);
        let count = 1;
        for (let k in obj) {
            if (obj[k].qtyChanged) {
                let saleDetail = Restaurant.Collection.SaleDetails.findOne(k);
                let amount = obj[k].qtyChanged * saleDetail.price;
                let newSaleDetail = {
                    _id: idGenerator.genWithPrefix(Restaurant.Collection.SaleDetails, transferSaleId, 2),
                    price: saleDetail.price,
                    quantity: obj[k].qtyChanged,
                    amount: (amount) * (1 - (obj[k].discount / 100)),
                    productId: saleDetail.productId,
                    discount: obj[k].discount,
                    saleId: transferSaleId,
                    transferOrSplit: true
                }
                Restaurant.Collection.SaleDetails.insert(newSaleDetail);
                Meteor.defer(() => {
                    let remainQty = obj[k].defaultQty - obj[k].qtyChanged;
                    Restaurant.Collection.SaleDetails.update(k, {
                        $set: {
                            quantity: remainQty,
                            amount: (remainQty * saleDetail.price) * (1 - saleDetail.discount / 100)
                        }
                    })
                });
            } else {
                Restaurant.Collection.SaleDetails.update(k, {
                    $set: {
                        saleId: transferSaleId,
                        transferOrSplit: true
                    }
                });
            }
        }
        Meteor.defer(function() {
            console.log(currentSaleId);
            Sale.sumSaleDetail(currentSaleId); //recalculate saleDetail
            Sale.sumSaleDetail(transferSaleId); //recalculate saleDetail
        })
        return transferSaleId;
    },
    setPrintToFalse(saleId) {
        Meteor.defer(() => {
            Restaurant.Collection.SaleDetails.direct.update({
                saleId: saleId
            }, {
                $set: {
                    isPrinting: false
                }
            }, {
                multi: true
            });
        })
    }
});

var updateExistSaleDetail = (currentSaleDetail, existSaleDetail) => {
    let newQty = currentSaleDetail.quantity + existSaleDetail.quantity;
    let totalAmount = (newQty * existSaleDetail.price) * (1 - existSaleDetail.discount / 100);
    Restaurant.Collection.SaleDetails.update(existSaleDetail._id, {
        $set: {
            amount: totalAmount,
            quantity: newQty
        }
    })
}


let insertSale = (tableId, location, saleDate, numberOfCustomer) => {
    Meteor._sleepForMs(500);
    let selector = {}
    var date = moment(saleDate).format('YYMMDD');
    selector._id = idGenerator.genWithPrefix(Restaurant.Collection.Sales, date, 3);
    selector.text = selector._id;
    selector.tableId = tableId;
    selector.tableLocation = location
    selector.saleDate = moment(saleDate).toDate();
    selector.status = 'active';
    selector.staff = Meteor.userId();
    selector.numberOfCustomer = numberOfCustomer;
    var customerId = Restaurant.Collection.Customers.findOne({}, {
        sort: {
            _id: 1
        }
    })._id;
    selector.customerId = customerId;
    var id = "";
    var company = Restaurant.Collection.Company.findOne();
    if (company != null) {
        id = company.baseCurrency;
    }
    var exchangeRate = Restaurant.Collection.ExchangeRates.findOne({
        base: id,
    }, {
        sort: {
            _id: -1,
            createdAt: -1
        }
    });
    if (!exchangeRate) {
        throw new Meteor.Error("សូមមេត្តាបញ្ចូលអត្រាប្តូរប្រាក់");
    } else {
        selector.exchangeRateId = exchangeRate._id;
    }
    var restaurantId = Restaurant.Collection.Sales.insert(selector)
    return restaurantId;
}

let dupplicatedSaleDetail = (saleDetail) => {
  Restaurant.Collection.SaleDetails.insert({
      _id: 'T' + saleDetail._id,
      discount: saleDetail.discount,
      amount: saleDetail.amount,
      price: saleDetail.price,
      productId: saleDetail.productId,
      quantity: saleDetail.quantity,
      saleId: saleDetail.saleId,
      status: 'saved',
  });
}
