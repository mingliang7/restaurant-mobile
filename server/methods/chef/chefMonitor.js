Meteor.methods({
    addSaleDetailToChef(doc){
        let table = Restaurant.Collection.Sales.findOne(doc.saleId);
        Restaurant.Collection.SaleDetails.direct.update({_id: doc._id}, {
            $set: {
                cookQty: doc.quantity,
                cookForTable: `${table._table.name}(${table._table._tableLocation.name})`,
                monitor: true,
                updatedAt: moment().toDate()
            }
        });
    },
    removeSaleDetailFromChef(doc){
        Restaurant.Collection.SaleDetails.direct.update({_id: doc._id}, {
            $unset: {cookForTable: ''},
            $set: {isCooking: false, cookQty: 0,monitor: false, updatedAt: doc.createdAt}
        });
    },
    updateCook({flag, doc}){
        if(flag){
            Restaurant.Collection.SaleDetails.direct.update({_id: doc._id}, {$set: {finishQty: doc.quantity, isCooking: false, isFinishing: flag}});
        }else{
            Restaurant.Collection.SaleDetails.direct.update({_id: doc._id}, {$set: {finishQty: 0 ,isFinishing: flag}});

        }
    },
    cookingFlag({flag, doc}){
        console.log(flag);
        Restaurant.Collection.SaleDetails.direct.update({_id: doc._id}, {$set: {isCooking: flag}});
    },
    addAllSaleDetailToChef(doc){
        let saleDetails = Restaurant.Collection.SaleDetails.find({saleId: doc._id, monitor: false});
        if(saleDetails.count() > 0){
            saleDetails.forEach(function (obj) {
                Restaurant.Collection.SaleDetails.direct.update({_id: obj._id}, {
                    $set: {
                        cookQty: obj.quantity,
                        cookForTable: `${doc._table.name}(${doc._table._tableLocation.name})`,
                        monitor: true,
                        updatedAt: moment().toDate()
                    }
                });
            });
        }
    }
});