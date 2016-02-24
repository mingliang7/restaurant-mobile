Template.restaurantActivePayment.created = function(){
  Session.set('activeSaleLimit', 20);
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("activeSales");
  })
}

Template.restaurantActivePayment.rendered = function(){
  try {
    this.autorun(()=>{
      if(!this.subscription.ready()){
        IonLoading.show();
      }else{
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
}
Template.restaurantActivePayment.events({
  'click .loadMore'(){
    let limit = Session.get('activeSaleLimit') + 10;
    Session.set('activeSaleLimit', limit);
    Meteor.subscribe("activeSales", limit);
  }
});
Template.restaurantActivePayment.helpers({
  activeSales(){
    return Restaurant.Collection.Sales.find({status: 'active'})
  },
  goToActivePaymentInvoice(){
    return `/restaurant/payment/${this._id}`
  },
  hasMore(){
    let limit = Session.get('activeSaleLimit');
    let count = Counts.get('activeSalesCount');
    return limit < count;
  }
})


Template.activeSale.helpers({
  listSaleDetails(){
    var sub = Meteor.subscribe("saleDetails", this._id);
    if(!sub.ready()){
      return false;
    }
    return Restaurant.Collection.SaleDetails.find({saleId: this._id});
  }
});
