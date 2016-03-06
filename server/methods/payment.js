Meteor.methods({
  checkLastPayment(paymentId, saleId) {
    let lastPayment = Restaurant.Collection.Payments.findOne({
      saleId: saleId
    }, {
      sort: {
        createdAt: -1
      }
    });
    console.log(lastPayment)
    let currentPayment = Restaurant.Collection.Payments.findOne(paymentId);
    if (lastPayment) {
      if (currentPayment.createdAt >= lastPayment.createdAt) {
        return true
      }
      return false;
    }
    return true;
  }
})