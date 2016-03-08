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

Template._sale_options.events({
  'click .print'(){
    let arr = [];
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.saleId);
    sale._payment.forEach(function(payment) {
      arr.push({text: payment._id});
    });
    debugger
    IonActionSheet.show({
      titleText: `ជម្រើសលេខវិក័យប័ត្របង់ប្រាក់ដើម្បីព្រីន`,
      buttons: arr,
      // destructiveText: 'ផ្ទេរវិក័យប័ត្រ',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        window.open(`/restaurant/invoice/${arr[index].text}`, '_blank');
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  }
})
