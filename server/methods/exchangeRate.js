Meteor.methods({
    insertExchangeRate(exchangeRate){
        return Restaurant.Collection.ExchangeRates.insert(exchangeRate);
    },
    removeExchangeRate(exchangeRate){
        return Restaurant.Collection.ExchangeRates.remove(exchangeRate);
    }
});
