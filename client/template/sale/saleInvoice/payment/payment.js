Template.restaurantSalePayment.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('sale', Router.current().params.invoiceId);
    this.subscribe = Meteor.subscribe('latestExchange');
  });
};
Template.restaurantSalePayment.rendered = function() {
  $(document).on("keydown", "input", function(e) {
    if (e.which == 13) e.preventDefault();
  });
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        console.log("false");
        IonLoading.show()
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {}
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
        paidAmount: sale.balanceAmount,
        dueAmount: sale.balanceAmount,
        balanceAmount: 0
      }
      return selector;
    } catch (e) {

    }
  }
});

Template.restaurantSalePayment.events({
  'keyup [name="tmpPaidAmount"],[name="dollar"]': function() {
    var dueAmount, tmpPaidAmount, dollar;
    dueAmount = parseFloat($('[name="dueAmount"]').val());
    tmpPaidAmount = $('[name="tmpPaidAmount"]').val();
    dollar = $('[name="dollar"]').val();
    tmpPaidAmount = tmpPaidAmount == '' ? 0 : parseFloat(tmpPaidAmount);
    dollar = dollar == '' ? 0 : parseFloat(dollar);
    var exchangeRate = Restaurant.Collection.ExchangeRates.findOne();
    var dollarConverted = dollar * exchangeRate.rates[0].rate;
    var totalPaid = dollarConverted + tmpPaidAmount;
    $('[name="balanceAmount"]').val(dueAmount - totalPaid);
    $('[name="paidAmount"]').val(totalPaid);
    if((dueAmount - totalPaid) < 0) {
      let changeInDollar = (totalPaid - dueAmount) / exchangeRate.rates[0].rate;
      $('[name="changeInDollar"]').val('-' + changeInDollar)
    }else if((dueAmount - totalPaid) == 0){
      $('[name="changeInDollar"]').val(0)
    }else{
      let changeInDollar = (dueAmount - totalPaid) / exchangeRate.rates[0].rate;
      $('[name="changeInDollar"]').val(changeInDollar)
    }
  },
  "keypress [name='tmpPaidAmount']" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  'click .savePrint' (event) {
    Session.set('savePrint', true)
  },
  'keyup [name="discount"]' (event) {
    let currentDiscount = $('[name="discount"]').val();
    if (currentDiscount != '') {
      if (parseFloat(currentDiscount) > 100 || parseFloat(currentDiscount) < 0) {
        $('[name="discount"]').val('0')
        getDefaultDueAmount();
      } else {
        checkDiscount();
      }
    } else if (currentDiscount == '' || currentDiscount == '0') {
      getDefaultDueAmount();
    }
  }
});

var checkDiscount = () => {
  let currentDiscount = $('[name="discount"]').val();
  let dueAmount = $('[name="tmpDueAmount"]').val();
  // let currentQty = $('[name="quantity"]').val();
  totalAmount = (parseFloat(dueAmount) * (1 - parseFloat(currentDiscount) / 100));
  $("[name='dueAmount']").val(totalAmount);
  $("[name='tmpPaidAmount']").val(totalAmount);
  $("[name='paidAmount']").val(totalAmount);
}
let getDefaultDueAmount = () => {
  let defaultDueAmount = parseFloat($('[name="tmpDueAmount"]').val());
  $("[name='dueAmount']").val(defaultDueAmount);
  $("[name='paidAmount']").val(defaultDueAmount);
  $("[name='balanceAmount']").val(0);
}
AutoForm.hooks({
  activePayment: {
    onSuccess(formType, result) {
      // Bert.alert('គិតលុយរួចរាល់', 'success', 'growl-bottom-right', 'fa-check');
      if (Session.get('savePrint')) {
        //window.open(`/restaurant/invoice/${result}`, '_blank');
        Router.go(`/restaurant/invoice/${result}`);
      } else {
        Router.go(`/restaurant/payment`);
      }
      Session.set('savePrint', false);

    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');

    }
  }
})
