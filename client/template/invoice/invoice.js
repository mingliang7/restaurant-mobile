Template.restaurantInvoice.helpers({
  data() {
    let paymentId = Router.current().params.paymentId;
    Fetcher.setDefault(paymentId, false);
    Fetcher.retrieve(paymentId, 'findPaymentInvoice', paymentId);
    return Fetcher.get(paymentId);
  }
});
