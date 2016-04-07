Restaurant.Collection.StockIn = new Mongo.Collection('restaurant_stockIn');
Restaurant.Schema.StockIn = new SimpleSchema({
  stockInDate:{
    type: Date,
    optional:true,
    defaultValue(){
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
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
  eopId: {
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
  },
  stockId: {
    type: String
  }
});
Restaurant.Collection.StockIn.attachSchema(Restaurant.Schema.StockIn);
