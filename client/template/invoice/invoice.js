Template.restaurantInvoice.helpers({
  data() {
    let paymentId = Router.current().params.paymentId;
    Fetcher.setDefault(paymentId, false);
    Fetcher.retrieve(paymentId, 'findPaymentInvoice', paymentId);
    return Fetcher.get(paymentId);
  },
  negativeNumber(amount){
    return parseFloat(amount) < 0
  },
  convertNumber(arg){
    let amount= parseFloat(arg);
    if(amount < 0){
      return arg.replace('-', '');
    }
    return arg;
  },
  goBack() {
    return false;
    Meteor.setTimeout(() => {
      window.print();
      Router.go('/restaurant/payment')
    }, 1000)
  }
});
