Restaurant.Collection.Units = new Mongo.Collection("restaurant_units");
Restaurant.Schema.Units = new SimpleSchema({
    name: {
        type: String,
        label: "ឈ្មោះ",
        unique: true,
        max: 200
    },
    description:{
        type:String,
        label:"ពិពណ៌នា",
        optional:true
    },
});
Restaurant.Collection.Units.attachSchema(Restaurant.Schema.Units);
