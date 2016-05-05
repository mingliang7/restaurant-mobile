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
    return Restaurant.Collection.Payments.remove(id);
  },
  multiPayment(obj){
    console.log(obj)
    let customer = Restaurant.Collection.Customers.findOne({},{_id: 1});
    let paymentDate = new Date();
    let status = "closed";
    let staffId = Meteor.userId();
    for(let k in obj){
      Meteor._sleepForMs(200);
      let selector = {
        _id: idGenerator.genWithPrefix(Restaurant.Collection.Payments, k, 2),
        customerId: customer._id,
        saleId: k,
        paymentDate: paymentDate,
        status: status,
        paidAmount: obj[k].total,
        truelyPaid: obj[k].total,
        dueAmount: obj[k].total,
        balanceAmount: 0,
        staffId: staffId
      }
      Restaurant.Collection.Payments.insert(selector);
    }
    return 'finished';
  }
})
