Meteor.methods({
    saleEop(id) {
            let sale = Restaurant.Collection.Sales.findOne(id);
            if (sale.eop.status) {
                return {
                    status: true
                };
            }
            return {
                status: false
            };
        },
        updateQtyOut(saleDetailDoc, changeQtyOut) {
            if (saleDetailDoc) {
                let currentTotalQty = saleDetailDoc.quantity +
                    saleDetailDoc.quantityOut;
                changeQtyOut = changeQtyOut > currentTotalQty ?
                    currentTotalQty : changeQtyOut;
                let calcQtyAfterQtyOut = currentTotalQty - changeQtyOut;
                Restaurant.Collection.SaleDetails.update({
                    _id: saleDetailDoc._id
                }, {
                    $set: {
                        amount: calcQtyAfterQtyOut *
                            saleDetailDoc.price,
                        quantity: calcQtyAfterQtyOut,
                        quantityOut: changeQtyOut
                    }
                });
            }
        },
        insertSale(selector, fDate) {
            let fastSell = false;
            if (!selector) {
                fastSell = true;
                selector = {};
                let table = Restaurant.Collection.Tables.findOne({}, {
                    _id: 1
                });
                selector.saleDate = fDate;
                selector.status = "active";
                selector.tableId = table._id;
                selector.tableLocation = table.tableLocationId;
            }
            var date = moment(selector.saleDate).format('YYMMDD');
            selector._id = idGenerator.genWithPrefix(Restaurant.Collection
                .Sales, date, 3);
            selector.text = selector._id;
            var customer = Restaurant.Collection.Customers.findOne({}, {
                sort: {
                    _id: 1
                }
            });
            if (!customer) {
                throw new Meteor.Error("សូមមេត្តាបញ្ចូលឈ្មោះអតិថិជន");
            }
            selector.customerId = customer._id;

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
                throw new Meteor.Error(
                    "សូមមេត្តាបញ្ចូលអត្រាប្តូរប្រាក់");
            } else {
                selector.exchangeRateId = exchangeRate._id;
            }


            var restaurantId = Restaurant.Collection.Sales.insert(
                selector);

            return fastSell ? {
                tableId: selector.tableId,
                tableLocationId: selector.tableLocation,
                sid: restaurantId
            } : restaurantId;
        },
        removeSaleIfNoSaleDetailExist(saleId) {
            Meteor.defer(() => {
                Meteor._sleepForMs(500);
                let saleDetails = Restaurant.Collection.SaleDetails
                    .find({
                        saleId: saleId
                    });
                if (saleDetails.count() <= 0) {
                    Restaurant.Collection.Sales.direct.remove(
                        saleId);
                }
            });
        },
        transferSaleAndSaleDetails: function(saleDetailId, fromSaleId,
            toSaleId) {
            Restaurant.Collection.SaleDetails.update(saleDetailId, {
                $set: {
                    saleId: toSaleId
                }
            });
            Meteor.defer(function() {
                // Meteor._sleepForMs(500);
                var saleDetails = Restaurant.Collection.SaleDetails
                    .find({
                        saleId: fromSaleId
                    });
                if (saleDetails.count() > 0) {
                    var set = {};
                    var sale = Restaurant.Collection.Sales.findOne(
                        fromSaleId);
                    var discount = sale && sale.discount ? sale
                        .discount : 0;
                    var saleSubTotal = 0;
                    saleDetails.forEach(function(saleDetail) {
                        saleSubTotal += parseFloat(
                            saleDetail.amount);
                    });
                    var baseCurrencyId = Restaurant.Collection.Company
                        .findOne().baseCurrency;
                    var total = saleSubTotal * (1 - discount /
                        100);
                    if (baseCurrencyId == "KHR") {
                        total = roundRielCurrency(total);
                    }
                    set.subTotal = saleSubTotal;
                    set.total = total;
                    set.owedAmount = total;
                    set.transferOrSplit = true;
                    Restaurant.Collection.Sales.direct.update(
                        fromSaleId, {
                            $set: set
                        });

                } else {
                    Restaurant.Collection.Sales.remove(
                        fromSaleId);
                }
            });
        },
        cancelInvoice(saleId, newSaleId) {
            Restaurant.Collection.SaleDetails.direct.update({
                saleId: saleId
            }, {
                $set: {
                    status: 'canceled'
                }
            }, {
                multi: true
            });
            let selector = {};
            selector.$set = {};
            selector.$set.status = 'canceled';
            if (newSaleId) {
                selector.$set.refId = newSaleId;
            }
            return Restaurant.Collection.Sales.direct.update(saleId,
                selector);
        },
        cancelAndCopy(selector, currentSaleId) {
            Meteor._sleepForMs(200);
            let newSaleId = Meteor.call('insertSale', selector);
            let currentSaleDetails = Restaurant.Collection.SaleDetails.find({
                saleId: currentSaleId
            });
            currentSaleDetails.forEach(function(saleDetail) {
                saleDetail.saleId = newSaleId;
                saleDetail._id = idGenerator.genWithPrefix(
                    Restaurant.Collection.SaleDetails,
                    newSaleId, 2);
                saleDetail.isPrinting = true;
                saleDetail.amount = (saleDetail.quantity +
                    saleDetail.quantityOut) * saleDetail.price;
                saleDetail.quantity = saleDetail.quantity +
                    saleDetail.quantityOut;
                Restaurant.Collection.SaleDetails.insert(
                    saleDetail);
            });
            Meteor.defer(() => {
                Meteor.call('cancelInvoice', currentSaleId,
                    newSaleId);
            });
            return newSaleId;
        },
        officerCheque(saleId, customerId) {
            Meteor.defer(function() {
                let customer = Restaurant.Collection.Customers.findOne(
                    customerId);
                let sale = Restaurant.Collection.Sales.findOne(
                    saleId);
                let discount = 0;
                let total = 0;
                if (customer.type && customer.type == 'officer') {
                    discount = customer.discount;
                }
                total = (sale.subTotal) * (1 - (discount / 100));
                Restaurant.Collection.Sales.update(saleId, {
                    $set: {
                        discount: discount,
                        total: total,
                        balanceAmount: total,
                        customerId: customerId
                    }
                });
            });
        },
        saveOfficerCheque(invoiceId) {
            Restaurant.Collection.Sales.direct.update(invoiceId, {
                $set: {
                    status: 'closed'
                }
            });
        },
        printedSales({
            q, saleDate, tableId
        }) {
            let saleDetailSelector = {
                isPrinting: false
            };
            let selector = {
                saleDate: {
                    $gte: saleDate
                },
                status: 'active'
            };
            let result = [];
            if (q) {
                let active = q.split(':');
                if (active.length > 1) {
                    let searchText = active[1] && active[1].substr(1, active[1].length -
                        1);
                    let regQuery = new RegExp(searchText &&
                        searchText.trim(), 'i');
                    let tag = active[1].substr(0, 1);
                    if (tag == 'a') {
                        saleDetailSelector.isPrinting = true;
                        if (searchText != '') {
                            selector.$or = [{
                                _id: {
                                    $regex: regQuery
                                }
                            }, {
                                total: {
                                    $regex: regQuery
                                }
                            }]
                        }
                    }
                } else {
                    if (q != '') {
                        let regQuery = new RegExp(q, 'i');
                        saleDetailSelector.isPrinting = false;
                        selector.$or = [{
                            _id: {
                                $regex: regQuery
                            }
                        }, {
                            total: {
                                $regex: regQuery
                            }
                        }]
                    }
                }
            } else {
                if (tableId != 'all') {
                    selector.tableId = tableId
                }

            }
            result = Restaurant.Collection.Sales.aggregate(
                [{
                    $match: selector
                }, {
                    $lookup: {
                        from: 'restaurant_saleDetails',
                        foreignField: 'saleId',
                        localField: '_id',
                        as: 'saleDetailDoc'
                    }
                }, {
                    $unwind: {
                        path: '$saleDetailDoc',
                        preserveNullAndEmptyArrays: true
                    }
                }, {
                    $redact: {
                        $cond: [{
                            $eq: [
                                '$saleDetailDoc.isPrinting',
                                saleDetailSelector.isPrinting
                            ]
                        }, "$$KEEP", "$$PRUNE"]
                    }
                }, {
                    $group: {
                        _id: '$_id',
                        printStatus: {
                            $last: {
                                $cond: [{
                                    $eq: [
                                        '$saleDetailDoc.isPrinting',
                                        true
                                    ]
                                }, true, false]
                            }
                        },
                        doc: {
                            $last: '$$ROOT'
                        }
                    }
                }]
            );
            return result
        }
});
