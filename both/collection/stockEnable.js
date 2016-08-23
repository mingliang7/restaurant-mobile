Restaurant.Collection.StockEnabled = new Mongo.Collection('restaurant_stockEnabled');
Restaurant.Schema.StockEnabled = new SimpleSchema({
    enabledDate: {
        type: Date,
        optional: true
    },
    autoReduceStock: {
      type: Boolean,
      label: 'កាត់ដោយស្វ័យប្រវត្តិ'
    },
    enableReduceStock:{
      type: Boolean,
      label: 'ដាក់អោយប្រើប្រាស់ការកាត់ស្តុក'
    }

});

Restaurant.Collection.StockEnabled.attachSchema(Restaurant.Schema.StockEnabled);
