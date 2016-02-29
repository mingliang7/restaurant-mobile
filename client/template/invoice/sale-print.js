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
      Router.go('/restaurant/sale');
    }, 1000)
  }
});
