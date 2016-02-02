Reading = {};
Reading.Schema = {};
Reading.Collection = {};


Reading.Collection.Books = new Mongo.Collection('reading_books');
Reading.Schema.Books = new SimpleSchema({
    title: {
        type: String
    },
    comment: {
        type: [Object],
        optional: true
    },
    like: {
        type: [Object],
        optional: true
    },
    episodes: {
        type: [Object]
    },
    "episodes.$.title": {
        type: String
    },
    "episodes.$.number": {
        type: String
    },
    "episodes.$.units": {
        type: [Object]
    },
    "episodes.$.units.$.title": {
        type: String
    },
    "episodes.$.units.$.number": {
        type: String
    },
    "episodes.$.units.$.content": {
        type: String
    },
    category: {
        type: [String],
        optional: true,
        autoform: {
            label: false,
            type: 'select-checkbox-inline',
            multiple: true,
            options(){
                return List.categories();
            }
        }
    },
    tags: {
        type: [String],
        optional: true,
        autoform: {
            type: 'select-checkbox',
            options(){
                return List.tagsByCategory();
            }
        }
    }
});

Reading.Collection.Books.attachSchema(Reading.Schema.Books);