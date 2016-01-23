Table = new Mongo.Collection('tables');
table = new SimpleSchema({
    number: {
        type: String
    },
    description: {
        type: String,
        optional: true
    },
    avatarUrl:{
        optional: true,
        type: String
    }
});

Table.attachSchema(table);