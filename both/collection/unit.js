Restaurant.Collection.Units = new Mongo.Collection("restaurant_units");
Restaurant.Schema.Units = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    description:{
        type:String,
        label:"Description",
        optional:true
    },
});
Restaurant.Collection.Units.attachSchema(Restaurant.Schema.Units);
