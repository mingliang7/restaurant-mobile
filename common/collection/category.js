Categories = new Mongo.Collection('categories');
category = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        optional: true
    }
});

Categories.attachSchema(category);