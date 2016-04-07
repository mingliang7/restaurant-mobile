Restaurant.Collection.Stocks = new Mongo.Collection('restaurant_stocks');
Restaurant.Schema.Stocks = new SimpleSchema({
    stockDate: {
        type: Date,
        label: 'ថ្ងៃដាក់ទំនិញចូល',
        defaultValue(){
          return moment().format('YYYY-MM-DD HH:mm:ss');
        }
    },
    supplierId: {
        type: String,
        label: 'អ្នកផ្គត់ផ្គង់',
        optional: true
    },
    voucher: {
        type: String,
        label: 'លេខវិក័យប័ត្រ',
        optional: true
    },
    description: {
        type: String,
        optional: true
    },
    tmpItems: {
      type: [Object],
      optional: true,
      blackbox: true
    },
    _supplier:{
      type: Object,
      blackbox: true,
      optional: true
    }
});
Restaurant.Collection.Stocks.attachSchema(Restaurant.Schema.Stocks);
