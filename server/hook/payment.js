Restaurant.Collection.Payments.before.insert((userId, doc) => {
    let prefix = `${doc.saleId}`;
    let currentId = doc._id;
    doc._id = idGenerator.genWithPrefix(Restaurant.Collection.Payments, prefix, 2);
    Sale.State.set(currentId, doc._id);
    doc.change = doc.balanceAmount;
    if (doc.paidAmount >= doc.dueAmount) {
        doc.status = 'closed';
        doc.truelyPaid = doc.dueAmount
        doc.balanceAmount = 0
    } else {
        doc.status = 'partial';
        doc.truelyPaid = doc.paidAmount;
    }
});

Restaurant.Collection.Payments.after.insert((userId, doc) => {
    Meteor.defer(() => {
        if (doc.discount) {
            let exactPaid = doc.truelyPaid / (1 - (doc.discount / 100));
            doc.paidAmount = exactPaid;
        } else {
            doc.paidAmount = doc.truelyPaid
        }
        updateSale(doc);
        Meteor.call('setPrintToFalse', doc.saleId);
        reduceStock({
            doc
        });
    });
});
Restaurant.Collection.Payments.after.remove((userId, doc) => {
    Meteor.defer(() => {
        Meteor._sleepForMs(200);
        removePaymentFromSale(doc);

        doc._id = `R${moment().format('YYYY-MM-DD-HH-mm-ss')}`;
        doc.status = 'removed';
        doc.staffId = userId;
        Meteor.call('insertRemovedPayment', doc)
    });
})

//remove
var removePaymentFromSale = function(doc) {
    var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
    var paidAmount = sale.paidAmount - doc.truelyPaid;
    var balanceAmount = sale.balanceAmount + doc.truelyPaid;
    var status = '';
    Restaurant.Collection.Sales.direct.update({
        _id: sale._id
    }, {
        $set: {
            status: 'active',
            statusDate: sale.saleDate,
            paidAmount: paidAmount,
            balanceAmount: balanceAmount
        }
    });
    closedSaleDetail('unsaved', doc.saleId);
};




//update and insert
var updateSale = function(doc, update, oldDoc) {
    var sale = Restaurant.Collection.Sales.findOne(doc.saleId);
    var paidAmount, balanceAmount, selector;
    if (update) {
        if (oldDoc.paidAmount > doc.paidAmount) {
            balanceAmount = doc.dueAmount - doc.paidAmount;
            paidAmount = sale.paidAmount - (oldDoc.paidAmount - doc.paidAmount);
        } else {
            balanceAmount = doc.dueAmount - doc.paidAmount;
            paidAmount = sale.paidAmount + (doc.paidAmount - oldDoc.paidAmount);
        }
    } else {
        paidAmount = sale.paidAmount + doc.paidAmount;
        balanceAmount = sale.balanceAmount - doc.paidAmount;
    }

    if (balanceAmount == 0) {
        closedSaleDetail('saved', doc.saleId);
        selector = {
            $set: {
                status: 'closed',
                statusDate: doc.paymentDate,
                paymentDate: doc.paymentDate,
                paidAmount: paidAmount,
                balanceAmount: balanceAmount
            }
        };
    } else {
        selector = {
            $set: {
                status: 'partial',
                statusDate: sale.saleDate,
                paymentDate: doc.paymentDate,
                paidAmount: paidAmount,
                balanceAmount: balanceAmount
            }
        };
    }
    return Restaurant.Collection.Sales.update({
        _id: doc.saleId
    }, selector);
};


let closedSaleDetail = (status, saleId) => {
    Restaurant.Collection.SaleDetails.direct.update({
        saleId: saleId
    }, {
        $set: {
            status: status
        }
    }, {
        multi: true
    });
};


function reduceStock({
    doc
}) {
    let selector = {};
    let stockEnable = Restaurant.Collection.StockEnabled.findOne();
    if (stockEnable && stockEnable.autoReduceStock && stockEnable.enableReduceStock) {
        let formatDate = moment(stockEnable.enabledDate).format('YYYY-MM-DD');
        selector.saleDate = {
            $gte: moment(formatDate).toDate()
        };
        selector._id = doc.saleId;
        selector.eop = {
            status: false
        }
        let sales = Restaurant.Collection.Sales.aggregate([{
            $match: selector
        }, {
            $lookup: {
                from: "restaurant_saleDetails",
                localField: "_id",
                foreignField: "saleId",
                as: "saleDetails"
            }
        }, {
            $unwind: {
                path: '$saleDetails',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $group: {
                _id: {
                    saleId: "$_id",
                    productId: '$saleDetails.productId',
                },
                date: {
                    $last: '$saleDate'
                },
                productId: {
                    $last: '$saleDetails.productId'
                },
                qty: {
                    $sum: '$saleDetails.quantity'
                }
            }
        }, {
            $lookup: {
                from: "restaurant_products",
                localField: "productId",
                foreignField: "_id",
                as: "productDoc"
            }
        }, {
            $unwind: {
                path: '$productDoc',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $unwind: {
                path: '$productDoc.ingradient',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $lookup: {
                from: "restaurant_material",
                localField: "productDoc.ingradient.productId",
                foreignField: "_id",
                as: "productDoc.ingradient.materialDoc"
            }
        }, {
            $unwind: {
                path: '$productDoc.ingradient.materialDoc'
            }
        }, {
            $project: {
                _id: 1,
                date: 1,
                productDoc: {
                    ingradient: {
                        materialDoc: 1,
                        productId: 1,
                        totalQty: {
                            $multiply: ["$productDoc.ingradient.qty", "$qty"]
                        },
                        qty: 1
                    }
                },
                qty: 1
            }
        }, {
            $group: {
                _id: {
                    saleId: '$_id.saleId',
                    productId: '$_id.productId'
                },
                data: {
                    $addToSet: {
                        ingradient: '$productDoc.ingradient'
                    }
                },
                date: {
                    $last: '$date'
                },
                fromSaleDetailqty: {
                    $last: '$qty'
                }
            }
        }, {
            $unwind: {
                path: '$data',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $group: {
                _id: '$_id.saleId',
                date: {
                    $last: '$date'
                },
                saleId: {
                    $last: '$_id.saleId'
                },
                materials: {
                    $addToSet: {
                        data: "$data.ingradient",
                        date: '$date',
                        fromSaleDetailQty: '$fromSaleDetailqty'
                    }
                },


            }
        }]);
        Meteor.call('reducingStock', {
            data: sales
        });
    }
};
