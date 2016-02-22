Restaurant.Collection.ExchangeRates = new Mongo.Collection("restaurant_exchangeRates");

Restaurant.Schema.ExchangeRates = new SimpleSchema({
    base: {
        type: String,
        label: "base CurrencyId",
        max: 50
    },
    rates: {
        type: [Object],
        optional: true,
        blackbox:true
    }
});
Restaurant.Collection.ExchangeRates.attachSchema(Restaurant.Schema.ExchangeRates);

