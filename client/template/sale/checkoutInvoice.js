Template.restaurantSaleCheckoutInvoice.created = function() {
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("categories");
  });
}

Template.restaurantSaleCheckoutInvoice.rendered = function() {
  Session.set('invoiceId', Router.current().params.invoiceId);
  try {    
    this.autorun(()=> {
      if(!this.subscription.ready()){
        IonLoading.show();
      }else{
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
  categories(){
    return Restaurant.Collection.Categories.find();
  },
  goToProduct(){
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}/category/${this._id}`
  }
});


Template.restaurantSaleCheckoutInvoice.onDestroyed(() => {

});
