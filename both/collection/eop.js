Restaurant.Collection.EndOfProcess = new Mongo.Collection('restaurant_eop');
Restaurant.Schema.EndOfProcess = new SimpleSchema({
  startEopDate:{
    type: Date
  },
  endEopDate:{
    type: Date
  }
});

Restaurant.Collection.EndOfProcess.attachSchema(Restaurant.Schema.EndOfProcess);
