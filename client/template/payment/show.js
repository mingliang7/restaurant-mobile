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
    return Restaurant.Collection.SaleDetails.find({saleId: Router.current().params.saleId});
  },
  invoiceNumber(){
    return `វិក័យប័ត្រលេខៈ ${Router.current().params.saleId}`;
  },
  saleInvoice(){
    return Restaurant.Collection.Sales.findOne({_id: Router.current().params.saleId});
  }
});


Template._sale_options.helpers({
  paymentList(){
    return `/restaurant/payment/${Router.current().params.saleId}/list`
  }
});

Template._sale_options.events({
  'click .print'(){
    let arr = [];
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.saleId);
    if(sale._payment){
      sale._payment.forEach(function(payment) {
        arr.push({text: payment._id, url: `/restaurant/invoice`});
      });
    }else{
      arr.push({text: sale._id, url: `/restaurant/sale-print`});
    }
    IonActionSheet.show({
      titleText: `ជម្រើសលេខវិក័យប័ត្របង់ប្រាក់ដើម្បីព្រីន`,
      buttons: arr,
      // destructiveText: 'ផ្ទេរវិក័យប័ត្រ',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        let url = `${arr[index].url}/${arr[index].text}`;
        window.open(url, '_blank');
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  }
})
