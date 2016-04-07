Restaurant.Collection.Stocks.before.insert(function(userId, doc) {
    doc._id = idGenerator.gen(Restaurant.Collection.Stocks, 9);
});

Restaurant.Collection.Stocks.after.insert(function(userId, doc) {
    Meteor.defer(() => {
        insertStockIn(doc);
    });
});
let insertStockIn = (doc) => {
    if (doc.tmpItems) {
        doc.tmpItems.forEach((item) => {
            let selector = {
                stockInDate: doc.stockDate,
                materialId: item.materialId,
                qty: item.qty,
                price: item.price,
                type: item.type,
                stockId: doc._id
            };
            Restaurant.Collection.StockIn.insert(selector);
        });
        Restaurant.Collection.Stocks.direct.update(doc._id, {
            $unset: {
                tmpItems: ''
            }
        });
    }
};
