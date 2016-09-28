Restaurant.Collection.SaleDetails.after.insert((userId, doc) => {
    Meteor.defer(() => {
        Sale.sumSaleDetail(doc.saleId); //sum sale details
    })
});
Restaurant.Collection.SaleDetails.before.update((userId, doc, fieldNames, modifier, options)=> {
    if (modifier.$set && modifier.$set.quantity) {
        if (doc.monitor && doc.isFinishing) {
            if (modifier.$set.quantity - doc.finishQty > 0) {
                modifier.$set.isFinishing = false;
            }
        }
    }
});

Restaurant.Collection.SaleDetails.after.update((userId, doc) => {
    Meteor.defer(() => {
        Sale.sumSaleDetail(doc.saleId); //sum sale details
    })
});

Restaurant.Collection.SaleDetails.after.remove((userId, doc) => {
    Meteor.defer(() => {
        Sale.sumSaleDetail(doc.saleId);
    });
});
