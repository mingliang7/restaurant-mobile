Restaurant.Collection.Vipcards = new Mongo.Collection('restaurant_vipcard');
Restaurant.Schema.Vipcards = new SimpleSchema({
  name: {
    type: String
  },
  value: {
    type: Number,
    decimal: true
  },
  expiredDate: {
    type: Date
  },
  description: {
    type: String,
    optional: true
  }
});

Restaurant.Collection.Vipcards.attachSchema(Restaurant.Schema.Vipcards);
