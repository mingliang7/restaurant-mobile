Meteor.methods({
    removeStock(id) {
        let stockIn = Restaurant.Collection.StockIn.findOne({
            stockId: id,
            status: 'closed'
        });
        if (stockIn) {
            throw new Meteor.Error('មិនអាចលុបបានពីព្រោះទំនិញត្រូវបានកាត់រួច');
        } else {
            Restaurant.Collection.StockIn.remove({
                stockId: id
            });
            Restaurant.Collection.Stocks.remove(id);
        }
    }
});
