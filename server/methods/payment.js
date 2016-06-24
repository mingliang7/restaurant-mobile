Meteor.methods({
  checkLastPayment(paymentId, saleId) {
    let lastPayment = Restaurant.Collection.Payments.findOne({
      saleId: saleId
    }, {
      sort: {
        createdAt: -1
      }
    });
    let currentPayment = Restaurant.Collection.Payments.findOne(paymentId);
    if (lastPayment) {
      if (currentPayment.createdAt >= lastPayment.createdAt) {
        return true
      }
      return false;
    }
    return true;
  },
  removePayment(id){
    Meteor._sleepForMs(200);
    return Restaurant.Collection.Payments.remove(id);
  },
  insertRemovedPayment(doc){
    Restaurant.Collection.Payments.direct.insert(doc);
  }
})
