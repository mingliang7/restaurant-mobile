Template.restaurantSaleTableSaleInvoice.created = function(){
   let saleId = Router.current().params.invoiceId;
   this.autorun(()=>{
     this.subscribe = Meteor.subscribe("sale", saleId);
     this.subscribe = Meteor.subscribe("saleDetails", saleId);
   });
};

Template.restaurantSaleTableSaleInvoice.rendered = function(){
  this.autorun(()=>{
    if(!this.subscription.ready()){
      IonLoading.show();
    }else{
      IonLoading.hide();
    }
  });
}

Template.restaurantSaleTableSaleInvoice.helpers({
  invoiceNumber(){
    let invoiceId = Router.current().params.invoiceId;
    return `វិក័យប័ត្រលេខ: ${invoiceId}`;
  }
});
