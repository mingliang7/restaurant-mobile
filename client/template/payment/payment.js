Template.restaurantSalePayment.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('sale', Router.current().params.invoiceId);
  });
};
Template.restaurantSalePayment.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show()
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
};
Template.restaurantSalePayment.helpers({
  paymentInvoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  }
});


Template.restaurantSalePayment.helpers({
  paymentInvoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  },
  sale() {
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.invoiceId);
    try {
      let selector = {
        customerId: sale.customerId,
        saleId: sale._id,
        // paymentDate: moment().format('MM/DD/YY'),
        payAmount: sale.total,
        dueAmount: sale.total,
        balanceAmount: 0
      }
      return selector;
    } catch (e) {

    }

  }
});
