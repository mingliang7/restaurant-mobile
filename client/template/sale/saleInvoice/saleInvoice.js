Template.restaurantSaleTableSaleInvoice.created = function(){
   let saleId = Router.current().params.invoiceId;
   this.autorun(()=>{
     this.subscribe = Meteor.subscribe("sale", saleId);
     this.subscribe = Meteor.subscribe("saleDetails", saleId);
   });
};

Template.restaurantSaleTableSaleInvoice.rendered = function(){
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

Template.restaurantSaleTableSaleInvoice.helpers({
  invoiceNumber(){
    let invoiceId = Router.current().params.invoiceId;
    return `វិក័យប័ត្រលេខ: ${invoiceId}`;
  },
  saleDetails(){
    return Restaurant.Collection.SaleDetails.find({},{sort: {_id: 1}});
  },
  saleInvoice(){
    return Restaurant.Collection.Sales.findOne();
  }
});



Template._sale_invoice_tabs.helpers({
  goToCheckout(){
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
  }
});
