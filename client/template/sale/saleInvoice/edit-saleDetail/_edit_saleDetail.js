Template.editSaleDetail.created = function() {
  this.autorun(() => {
    let params = Router.current().params;
    this.subscribe = Meteor.subscribe("saleDetailBySelfId", params.invoiceId, params.saleDetailId);
  });
};

Template.editSaleDetail.rendered = function() {
  try {
    if (!this.subscribtion.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }

  } catch (e) {

  }
};


Template.editSaleDetail.helpers({
  saleDetail() {
    let params = Router.current().params;
    let saleDetail = Restaurant.Collection.SaleDetails.findOne(params.saleDetailId);
    return saleDetail;
  },
  goToSale() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`;
  },
  productName(saleDetail) {
    try {
      return `${saleDetail._product._category.name}${saleDetail._product.name}`;
    } catch (e) {

    }
  },
  sumQuantity() {
    let params = Router.current().params;
    let saleDetail = Restaurant.Collection.SaleDetails.findOne(params.saleDetailId);
    return saleDetail.quantity + saleDetail.quantityOut;
  },
  remainQty() {
    let params = Router.current().params;
    let saleDetail = Restaurant.Collection.SaleDetails.findOne(params.saleDetailId);
    return (saleDetail.quantity + saleDetail.quantityOut) - saleDetail.quantityOut;
  }

});


Template.editSaleDetail.events({
  "keyup [name='quantity']" (event, template) {
    let currentQty = $("[name='quantity']").val();
    let currentPrice = $('[name="price"]').val();
    let totalAmount;
    if (currentQty == '0') {
      $("[name='quantity']").val('1');
      $("[name='amount']").val(currentPrice);
    } else {
      checkDiscount();
    }
  },
  'keypress [name="quantity"]' (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  "keyup [name='quantityOut']" (event, template) {
    let currentQtyOut = $("[name='quantityOut']").val();
    if (currentQtyOut == '0' || currentQtyOut == '') {
      $("[name='quantityOut']").val('0');
      checkDiscount();
    } else {
      if (parseFloat(currentQtyOut) >= parseFloat($('[name="quantity"]').val())) {
        alertify.warning('ចំនួនដកចេញមិនអាចលើសពីចំនួនសរុប!');
        $("[name='quantityOut']").val('0');
      } else {
        checkDiscount();
      }
    }
  },
  "click [name='quantityOut']" (e) {
    $(e.currentTarget).select();
  },
  'keypress [name="quantityOut"]' (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  "keyup [name='price']" (event, template) {
    let currentQty = $("[name='quantity']").val();
    let tmpPrice = this.value;
    let currentPrice = $('[name="price"]').val();
    let totalAmount;
    if (currentPrice == '0') {
      $("[name='price']").val(tmpPrice);
      $("[name='amount']").val(`${parseFloat(currentQty) * parseFloat(tmpPrice)}`);
    } else {
      checkDiscount();
    }
  },
  "keypress [name='price']" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  "keyup [name='discount']" (event) {
    let currentDiscount = $('[name="discount"]').val();
    if (currentDiscount != '') {
      if (parseFloat(currentDiscount) > 100 || parseFloat(currentDiscount) < 0) {
        $('[name="discount"]').val('0');
      } else {
        checkDiscount();
      }
    }
  }

});

var checkDiscount = () => {
  let currentDiscount = $('[name="discount"]').val();
  let currentPrice = $('[name="price"]').val();
  let qty = $('[name="quantity"]').val();
  let currentQtyOut = $("[name='quantityOut']").val();
  let currentQty = (qty - currentQtyOut);
  totalAmount = (parseFloat(currentPrice) * parseFloat(currentQty)) * (1 - parseFloat(currentDiscount) / 100);
  $("[name='amount']").val(totalAmount);
  $('[name="remainQty"]').val(currentQty);
};

AutoForm.hooks({
  editSaleDetail: {
    before: {
      update(doc) {
        doc.$set.quantity = doc.$set.quantity - doc.$set.quantityOut;
        return doc;
      }
    },
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានសម្រេច!', 'success', 'growl-bottom-right');
      let params = Router.current().params;
      Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`);
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
