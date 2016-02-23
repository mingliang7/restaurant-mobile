Restaurant.Collection.TableLocations = new Mongo.Collection("restaurant_tableLocations");
Restaurant.Schema.TableLocations = new SimpleSchema({
    name: {
        type: String,
        label: "ឈ្មោះ",
        unique: true,
        max: 200
    },
    description: {
        type: String,
        label: "ពិពណ៌នា",
        optional: true
    }
});
Restaurant.Collection.TableLocations.attachSchema(Restaurant.Schema.TableLocations);
