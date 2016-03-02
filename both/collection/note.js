Restaurant.Collection.Notes = new Mongo.Collection("restaurant_notes");
Restaurant.Schema.Notes = new SimpleSchema({
    name: {
        type: String,
        label: "កត់ត្រា",
        optional: true
    },
    description: {
        type: String,
        label: "ពិពណ៌នា",
        optional: true
    }
});
Restaurant.Collection.Notes.attachSchema(Restaurant.Schema.Notes);
