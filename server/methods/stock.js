Meteor.methods({
    removeStock(id) {
        Restaurant.Collection.StockIn.remove({
            stockId: id
        });
        Restaurant.Collection.Stocks.remove(id);
    }
});
