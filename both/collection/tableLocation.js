Restaurant.Collection.TableLocations = new Mongo.Collection("restaurant_tableLocations");
Restaurant.Schema.TableLocations = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }
});
Restaurant.Collection.TableLocations.attachSchema(Restaurant.Schema.TableLocations);
