Restaurant.Collection.Notes = new Mongo.Collection("restaurant_notes");
Restaurant.Schema.Notes = new SimpleSchema({
    name: {
        type: String,
        label: "Note",
        optional: true
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }
});
Restaurant.Collection.Notes.attachSchema(Restaurant.Schema.Notes);
