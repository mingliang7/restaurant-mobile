Meteor.methods({
  extractContent: function(sales) {
    var exchange = Restaurant.Collection.ExchangeRates.findOne({}, {sort: {created: -1}});
    var balanceAmount = 0,
      dueAmount = 0,
      paidAmount = 0;
    sales.forEach(function(sale) {
      balanceAmount += sale._payment.balanceAmount;
      paidAmount += sale._payment.paidAmount;
      dueAmount += sale._payment.dueAmount;
    });
    var footer = {
      balanceAmount: balanceAmount,
      dueAmount: dueAmount,
      paidAmount: paidAmount,
      balanceAmountInKHR: balanceAmount * exchange.rates[0].rate,
      paidAmountInKHR: paidAmount * exchange.rates[0].rate,
      dueAmountInKHR: dueAmount * exchange.rates[0].rate,
    };
    return footer;
  }
});
