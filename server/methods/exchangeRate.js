Meteor.methods({
    insertExchangeRate(exchangeRate){
        return Restaurant.Collection.ExchangeRates.insert(exchangeRate);
    }
});