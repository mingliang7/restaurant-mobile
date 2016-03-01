Template.restaurantSalePrint.helpers({
  data() {
    let saleId = Router.current().params.saleId;
    Fetcher.setDefault(saleId, false);
    Fetcher.retrieve(saleId, 'findSaleInvoice', saleId);
    return Fetcher.get(saleId);
  },
  goBack() {
    Meteor.setTimeout(() => {
      window.print();
      history.go(-1);
      //Router.go('/restaurant/payment');
    }, 1000)
  }
});
