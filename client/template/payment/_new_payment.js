Template.restaurantActivePaymentInvoice.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('sale', Router.current().params.invoiceId);
  });
};
Template.restaurantActivePaymentInvoice.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        console.log("false");
        IonLoading.show()
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {
  }
};
Template.restaurantActivePaymentInvoice.helpers({
  paymentInvoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  }
});


Template.restaurantActivePaymentInvoice.helpers({
  paymentInvoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  },
  sale() {
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.invoiceId);
    try {
      let selector = {
        customerId: sale.customerId,
        saleId: sale._id,
        paymentDate: new Date(),
        paidAmount: sale.balanceAmount,
        dueAmount: sale.balanceAmount,
        balanceAmount: 0
      }
      return selector;
    } catch (e) {

    }

  }
});

Template.restaurantActivePaymentInvoice.events({
  'keyup [name="paidAmount"]': function() {
    var dueAmount, paidAmount;
    dueAmount = parseFloat($('[name="dueAmount"]').val());
    paidAmount = $('[name="paidAmount"]').val();
    if (paidAmount === '') {
      $('[name="balanceAmount"]').val(dueAmount);
    } else {
      $('[name="balanceAmount"]').val(dueAmount - parseFloat(
        paidAmount));
    }
  },
  "keypress [name='paidAmount']" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  'click .savePrint'(event){
    Session.set('savePrint', true)
  }
});


// AutoForm.hooks({
//   activePayment:{
//     onSuccess(formType, result){
//       Bert.alert('គិតលុយរួចរាល់', 'success', 'growl-bottom-right', 'fa-check');
//       debugger;
//       if(Session.get('savePrint')){
//         //window.open(`/restaurant/invoice/${result}`, '_blank');
//        Router.go(`/restaurant/invoice/${result}`);
//       }else{
//         Router.go('/restaurant/payment');
//       }
//       Session.set('savePrint', false);
//
//     },
//     onError(formType, err){
//       Bert.alert(err.message, 'danger', 'growl-bottom-right');
//
//     }
//   }
// })
