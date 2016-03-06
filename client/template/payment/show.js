Template.restaurantActivePaymentShow.created = function(){
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("closedSale", Router.current().params.saleId);
    this.subscribe = Meteor.subscribe("saleDetails", Router.current().params.saleId, 30);
  });
}

Template.restaurantActivePaymentShow.rendered = function(){
  this.autorun(()=>{
    if(!this.subscription.ready()){
      IonLoading.show();
    }else{
      IonLoading.hide();
    }
  });
}


Template.restaurantActivePaymentShow.helpers({
  saleDetails(){
    return Restaurant.Collection.SaleDetails.find({saleId: Router.current().params.saleId, status: 'saved'});
  },
  invoiceNumber(){
    return `វិក័យប័ត្រលេខៈ ${Router.current().params.saleId}`
  },
  saleInvoice(){
    return Restaurant.Collection.Sales.findOne({_id: Router.current().params.saleId, status: 'closed'});
  }
})


Template._sale_options.helpers({
  paymentList(){
    return `/restaurant/payment/${Router.current().params.saleId}/list`
  }
});
