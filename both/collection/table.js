Restaurant.Collection.Tables = new Mongo.Collection("restaurant_tables");
Restaurant.Schema.Tables = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    tableLocationId: {
        type: String,
        label: "Table Location",
        autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.tableLocations();
            }
        }
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    branchId: {
        type: String,
        label: "Branch"
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
    }
});
Restaurant.Collection.Tables.attachSchema(Restaurant.Schema.Tables);
