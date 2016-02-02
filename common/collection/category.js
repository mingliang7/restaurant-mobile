Categories = new Mongo.Collection('categories');
category = new SimpleSchema({
    name: {
        type: String
    },
    tag: {
        type: [String],
        autoform: {
            type: 'select-checkbox',
            options(){
                return List.tags();
            }
        }
    },
    description: {
        type: String,
        optional: true
    }
});

Categories.attachSchema(category);