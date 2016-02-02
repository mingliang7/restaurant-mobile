
Reading.Collection.Tags = new Mongo.Collection('book_tags');

Reading.Schema.Tags = new SimpleSchema({
    name: {
        type: String
    }
});

Reading.Collection.Tags.attachSchema(Reading.Schema.Tags);