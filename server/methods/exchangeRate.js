Meteor.methods({
  insertExchangeRate(exchangeRate) {
    return Restaurant.Collection.ExchangeRates.insert(exchangeRate);
  },
  updateExchangeRate(id, set) {
    return Restaurant.Collection.ExchangeRates.update(id, {
      $set: set
    });
  },
  removeExchangeRate(exchangeRate) {
    return Restaurant.Collection.ExchangeRates.remove(exchangeRate);
  }
});
