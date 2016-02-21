Restaurant.Collection.Sales = new Mongo.Collection("restaurant_sales");
Restaurant.Schema.Sales = new SimpleSchema({
  saleDate: {
    type: Date,
    label: "Sale Date"
  },
  discount: {
    type: Number,
    label: "Discount",
    decimal: true,
    optional: true
  },
  subTotal: {
    type: Number,
    label: "SubTotal",
    decimal: true,
    optional: true
  },
  total: {
    type: Number,
    label: "Total",
    decimal: true,
    optional: true
  },
  staffId: {
    type: String,
    label: "Staff",
    autoValue() {
      if (this.isInsert) {
        return Meteor.userId();
      }
    }
    //regEx: /^[a-z0-9A-Z_]{3,15}$/
  },
  status: {
    type: String,
    label: "Status"
  },
  customerId: {
    type: String,
    label: "Phone",
    optional: true
  },
  tableId: {
    type: String,
    label: "Table"
  },
  exchangeRateId: {
    type: String,
    label: "Exchange Rate",
    optional: true
  },
  owedAmount: {
    type: Number,
    label: "Owed Amount",
    optional: true
  }
});
Restaurant.Collection.Sales.attachSchema(Restaurant.Schema.Sales);
