Template.restaurantSalePayment.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('sale', Router.current().params.invoiceId);
  });
};
Template.restaurantSalePayment.rendered = function() {
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
Template.restaurantSalePayment.helpers({
  paymentInvoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  }
});


Template.restaurantSalePayment.helpers({
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
        paidAmount: sale.total,
        dueAmount: sale.total,
        balanceAmount: 0
      }
      return selector;
    } catch (e) {

    }

  }
});

Template.restaurantSalePayment.events({
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
});


AutoForm.hooks({
  payment:{
    onSuccess(formType, result){
      Bert.alert('គិតលុយរួចរាល់', 'success', 'growl-bottom-right', 'fa-check');
      Router.go('/restaurant/sale');
    },
    onError(formType, err){
      Bert.alert(err.message, 'danger', 'growl-bottom-right');

    }
  }
})
