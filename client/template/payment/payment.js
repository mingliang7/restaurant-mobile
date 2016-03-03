Tracker.autorun(function() {
  if (Session.get('activeSaleLimit')) {
    Meteor.subscribe("activeSales", Session.get('activeSaleLimit'));
  }
});

Template.restaurantActivePayment.created = function() {
  Session.set('activeSaleLimit', 5);
  Meteor.subscribe("activeSalesCount");
  this.autorun(() => {})
}

Template.restaurantActivePayment.rendered = function() {
  let invoiceId = Session.get('invoiceId');
  if (!_.isUndefined(invoiceId)) {
    Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
    Session.set('invoiceId', undefined);
  }
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
Template.restaurantActivePayment.events({
  'click .loadMore' () {
    let limit = Session.get('activeSaleLimit') + 5;
    Session.set('activeSaleLimit', limit);
  }
});
Template.restaurantActivePayment.helpers({
  activeSales() {
    return Restaurant.Collection.Sales.find({
      status: 'active'
    }, {
      sort: {
        _id: 1
      }
    })
  },
  goToActivePaymentInvoice() {
    return `/restaurant/sale/${this.tableLocation}/table/${this.tableId}/saleInvoice/${this._id}`;
  },
  hasMore() {
    let limit = Session.get('activeSaleLimit');
    let count = Counts.get('activeSalesCount');
    debugger
    return limit < count;
  }
})


Template.activeSale.helpers({
  listSaleDetails() {
    var sub = Meteor.subscribe("saleDetails", this._id);
    if (!sub.ready()) {
      return false;
    }
    return Restaurant.Collection.SaleDetails.find({
      saleId: this._id
    });
  }
});
