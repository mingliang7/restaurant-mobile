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
    Session.set('saleDetailObj', {});
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
  }
});

Template.saleDetail.events({
  'click .remove-sale-detail'(){
    let data = this;
    IonPopup.confirm({
      title: 'តើអ្នកត្រូវការលុបឬ?',
      template: `លុបទំនិញ ${data._product._category.name}${data._product.name}?`,
      onOk: () => {
        Meteor.call('removeSaleDetail', data._id, (err, result) => {
          if (err) {
            Bert.alert(`លុបមិនបានជោគជ័យ! ${data._product.name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`លុបបានជោគជ័យ! ${data._product.name}`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled','info','growl-bottom-right','fa-info')
      }
    });
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSale
Template.tableHeader.helpers({
  goToEditSale(){
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSale`;
  }
})

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editDiscount

Template.saleInvoiceTotal.helpers({
  goToEditDiscount(){
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editDiscount`;
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSaleDetail/:saleDetailId

Template.saleDetail.helpers({
  goToSaleDetailEdit() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSaleDetail/${this._id}`;
  }
})
