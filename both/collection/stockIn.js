Restaurant.Collection.StockIn = new Mongo.Collection('restaurant_stockIn');
Restaurant.Schema.StockIn = new SimpleSchema({
  productId: {
    label: 'ឈ្មោះវត្ថុធាតុដើម',
    type: String
  },
  qty: {
    label: 'ចំនួន',
    type: Number,
    decimal: true
  },
  price: {
    label: 'តម្លៃ',
    type: Number,
    decimal: true
  },
  type: {
    label: 'ប្រភេទ',
    type: String
  },
  description: {
    label: 'បរិយាយ',
    type: String,
    optional: true
  },
  status: {
    type: String,
    autoValue() {
      if (this.isInsert) {
        return 'active';
      }
    }
  }
});
Restaurant.Collection.StockIn.attachSchema(Restaurant.Schema.StockIn);
