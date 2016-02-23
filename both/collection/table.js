Restaurant.Collection.Tables = new Mongo.Collection("restaurant_tables");
Restaurant.Schema.Tables = new SimpleSchema({
    name: {
        type: String,
        label: "ឈ្មោះ",
        max: 200
    },
    chairAmount: {
      type: Number,
      label:"ចំនួនកៅអី",
      autoform: {
        type: "select",
        options(){
          return Restaurant.List.chairAmount();
        }
      }
    },
    tableLocationId: {
        type: String,
        label: "ទីតាំងតុ",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.tableLocations();
            }
        }
    },
    description: {
        type: String,
        label: "ពិពណ៌នា",
        optional: true
    },
    left:{
        type:String,
        label:"Left",
        optional:true
    },
    top:{
        type:String,
        label:"Top",
        optional:true
    },
    _tableLocation: {
      type: Object,
      optional: true,
      blackbox: true
    }
});
Restaurant.Collection.Tables.attachSchema(Restaurant.Schema.Tables);
