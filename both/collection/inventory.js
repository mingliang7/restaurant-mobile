Restaurant.Collection.Inventory = new Mongo.Collection('restaurant_inventory');
Restaurant.Schema.Inventory = new SimpleSchema({
    date: {
        type: Date
    },
    openingBalance: {
        type: Number,
        decimal: true,
    },
    materialId: {
        type: String
    },
    materialCategoryId: {
      type: String
    },
    reduceQty: {
        type: Number,
        decimal: true
    },
    stockIn: {
        type: Number,
        decimal: true
    },
    balance: {
        type: Number,
        decimal: true
    }
});

Restaurant.Collection.EndOfProcess.attachSchema(Restaurant.Schema.Inventory);
