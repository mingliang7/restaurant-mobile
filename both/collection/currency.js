
Restaurant.Collection.Currency = new Mongo.Collection("restaurant_currency");
Restaurant.Schema.Currency = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true
    },
    symbol: {
        type: String,
        label: "Symbol",
        unique: true
    },
    num: {
        type: String,
        label: "Num",
        unique: true
    }
});
Restaurant.Collection.Currency.attachSchema(Restaurant.Schema.Currency);
