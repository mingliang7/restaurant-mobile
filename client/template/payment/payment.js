Tracker.autorun(function() {
  if (Session.get('activeSaleLimit')) {
    Meteor.subscribe("activeSales", Session.get('saleStatus'), Session.get('activeSaleLimit'));
  }
  if(Session.get('saleStatus') == 'partial'){
    Meteor.subscribe("activeSales", Session.get('saleStatus'), 100);
  }
});

Template.restaurantActivePayment.created = function() {
  Session.set('activeSaleLimit', 5);
  Session.set('saleStatus', 'active')
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
  },
  'click .sale-status'(e){
    if($(e.currentTarget).prop('checked')){
      $('.sale-status-label').text('កំពុងលក់')
      Session.set('saleStatus', 'active');
    }else{
      $('.sale-status-label').text('ជំពាក់')
      Session.set('saleStatus', 'partial');
    }
  }
});
Template.restaurantActivePayment.helpers({
  activeSales() {
    return Restaurant.Collection.Sales.find({
      status: Session.get('saleStatus')
    }, {
      sort: {
        _id: 1
      }
    })
  },
  saleIsNotZero(){
    let sale =  Restaurant.Collection.Sales.find({
      status: Session.get('saleStatus')
    }, {
      sort: {
        _id: 1
      }
    });
    if(sale.count() > 0){
      return true;
    }
    return false;
  },
  goToActivePaymentInvoice() {
    let status =Session.get('saleStatus');
    // if(status == 'partial'){
    //   if(Roles.userIsInRole(Meteor.userId(), 'setting')){
    //     return `/restaurant/sale/${this.tableLocation}/table/${this.tableId}/saleInvoice/${this._id}`;
    //   }
    //   return false;
    // }
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
