Restaurant.Collection.StockIn = new Mongo.Collection('restaurant_stockIn');
Restaurant.Schema.StockIn = new SimpleSchema({
  materialId: {
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
    type: String,
    autoform:{
      type: 'select',
      options(){
        return Restaurant.List.stockType();
      }
    }
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
  },
  _material: {
    type: Object,
    optional: true,
    blackbox: true
  }
});
Restaurant.Collection.StockIn.attachSchema(Restaurant.Schema.StockIn);
