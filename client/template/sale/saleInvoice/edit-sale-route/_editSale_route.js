Template.restaurantSaleTableSaleInvoiceEditSale.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("sale", Router.current().params.invoiceId);
  });
}

Template.restaurantSaleTableSaleInvoiceEditSale.rendered = function() {
  if (!this.subscribtion.ready()) {
    IonLoading.show()
  } else {
    IonLoading.hide();
  }
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
  invoiceNumber(){
    let params = Router.current().params;
    return params.invoiceId;
  }
});

Template.restaurantSaleTableSaleInvoiceEditDiscount.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("sale", Router.current().params.invoiceId);
  });
}

Template.restaurantSaleTableSaleInvoiceEditDiscount.rendered = function() {
  if (!this.subscribtion.ready()) {
    IonLoading.show()
  } else {
    IonLoading.hide();
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
  invoiceNumber(){
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
      }
    }
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
        debugger
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
