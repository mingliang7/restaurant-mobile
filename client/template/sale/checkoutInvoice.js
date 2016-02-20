Template.restaurantSaleCheckoutInvoice.onRendered(() => {
  Session.set('invoiceId', Router.current().params.invoiceId);
});


Template.restaurantSaleCheckoutInvoice.helpers({
  tableLocation() {
    return `ទីតាំងតុ`
  },
  goToTableLocation() {
    let tableLocationId = Router.current().params.tableLocationId;
    return `/restaurant/sale/${tableLocationId}`;
  }
});


Template.restaurantSaleCheckoutInvoice.onDestroyed(() => {
  let invoiceId = Session.get('invoiceId');
  Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
  Session.set('invoiceId', undefined);
});
