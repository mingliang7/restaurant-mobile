Template.restaurantSaleCheckoutInvoice.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("categories");
    this.subscribe = Meteor.subscribe('tableByLocation', Router.current().params.tableLocationId, Router.current().params.tableId)
  });
}

Template.restaurantSaleCheckoutInvoice.rendered = function() {
  Session.set('invoiceId', Router.current().params.invoiceId);
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
}


Template.restaurantSaleCheckoutInvoice.helpers({
  tableLocation() {
    return `ទីតាំងតុ`
  },
  goToTableLocation() {
    let tableLocationId = Router.current().params.tableLocationId;
    return `/restaurant/sale/${tableLocationId}`;
  },
  categories() {
    return Restaurant.Collection.Categories.find({}, {
      sort: {
        name: 1
      }
    });
  },
  goToProduct() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}/category/${this._id}`
  },
  currentPath() {
    let table =  Restaurant.Collection.Tables.findOne(Router.current().params.tableId);
    return `ទីតាំងតុៈ ${table._tableLocation.name} ​> តុលេខៈ ${table.name}  > `
  }
});


Template.restaurantSaleCheckoutInvoice.onDestroyed(() => {

});
