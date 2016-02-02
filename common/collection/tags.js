Book = {};
Book.Schema = {};
Book.Collection = {};

Book.Collection.Tags = new Mongo.Collection('book_tags');

Book.Schema.Tags = new SimpleSchema({
    name: {
        type: String
    }
});

Book.Collection.Tags.attachSchema(Book.Schema.Tags);