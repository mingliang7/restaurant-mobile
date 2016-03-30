Template.restaurantSaleTableSaleInvoiceEditSale.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("sale", Router.current().params.invoiceId);
  });
}

Template.restaurantSaleTableSaleInvoiceEditSale.rendered = function() {
  try {
    if (!this.subscribtion.ready()) {
      IonLoading.show()
    } else {
      IonLoading.hide();
    }
  } catch (e) {}
}

Template.restaurantSaleTableSaleInvoiceEditSale.helpers({
  sale() {
    let saleId = Router.current().params.invoiceId;
    return Restaurant.Collection.Sales.findOne(`${saleId}`);
  },
  goToSale() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`;
  },
  invoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  }
});
Template.restaurantSaleTableSaleInvoiceEditSale.events({
  'change [name="customerId"]'(event){
    let invoiceId = Router.current().params.invoiceId;
    let customerId = event.currentTarget.value;
    if(customerId != ''){
      Meteor.call('officerCheque', invoiceId, customerId);
    }
  },
});
Template.restaurantSaleTableSaleInvoiceEditDiscount.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("sale", Router.current().params.invoiceId);
  });
};

Template.restaurantSaleTableSaleInvoiceEditDiscount.rendered = function() {
  try {
    if (!this.subscribtion.ready()) {
      IonLoading.show()
    } else {
      IonLoading.hide();
    }
  } catch (e) {

  }

}

Template.restaurantSaleTableSaleInvoiceEditDiscount.helpers({
  sale() {
    let saleId = Router.current().params.invoiceId;
    return Restaurant.Collection.Sales.findOne(`${saleId}`);
  },
  goToSale() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`;
  },
  invoiceNumber() {
    let params = Router.current().params;
    return params.invoiceId;
  }
});
Template.restaurantSaleTableSaleInvoiceEditDiscount.events({
  "keyup [name='discount']" (event, template) {
    let discount = $('[name="discount"]').val();
    let currentSubTotal = parseFloat($('[name="subTotal"]').val());
    if (discount != '') {
      if (parseFloat(discount) < 0 || parseFloat(discount) > 100) {
        $('[name="discount"]').val('0');
      } else {
        $("[name='total']").val(parseFloat(currentSubTotal) * (1 - parseFloat(discount) / 100));
        $("[name='balanceAmount']").val(parseFloat(currentSubTotal) * (1 - parseFloat(discount) / 100));
      }
    }
  },
  'change [name="vipcard"]' (e) {
    Meteor.call('getVipCard', $(e.currentTarget).val(), (err, result) => {
      if (err) {
        $('[name="discount"]').val(0).keyup();
        $('[name="vipcardId"]').val('').keyup();
      } else {
        if (result.message) {
          alertify.error(result.message.error);
          $('[name="discount"]').val(0).keyup();
          $('[name="vipcardId"]').val('').keyup();
        } else {
          $('[name="discount"]').val(result.value).keyup();
          $('[name="vipcardId"]').val(result._id).keyup();
        }
      }
    });
  },
  'click [name="vipcard"]' (e) {
    $(e.currentTarget).select();
  }
});
AutoForm.hooks({
  editSaleCustom: {
    before: {
      update(doc) {
        if (doc.$set) {
          let currentTime = moment().format('HH:mm:ss');
          let currentDate = moment(doc.$set.saleDate).format('YYYY/MM/DD');
          doc.$set.saleDate = moment(`${currentDate} ${currentTime}`).toDate();
        }
        return doc;
      }
    },
    onSuccess(formType, result) {
      let params = Router.current().params;
      Bert.alert('កែប្រែបានសម្រេច', 'success', 'growl-bottom-right');
      Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`);
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  },
  editDiscountCustom: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានសម្រេច', 'success', 'growl-bottom-right');
      let params = Router.current().params;
      Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`);;
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
