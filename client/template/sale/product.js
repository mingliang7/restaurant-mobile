Template.restaurantSaleCheckoutInvoiceCategoryProduct.created = function() {
  this.autorun(() => {
    let categoryId = Router.current().params.categoryId;
    this.subscribe = Meteor.subscribe('productByCategory', categoryId);
  });
}

Template.restaurantSaleCheckoutInvoiceCategoryProduct.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
}


Template.restaurantSaleCheckoutInvoiceCategoryProduct.helpers({
  categoryName() {
    try {
      return Restaurant.Collection.Products.findOne()._category.name;
    } catch (e) {}
  },
  products() {
    return Restaurant.Collection.Products.find();
  },
  goToCategory() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
  }
});

Template.restaurantSaleCheckoutInvoiceCategoryProduct.events({
  'click .icon-add-new-product' (event) {
    let params = Router.current().params;
    let selector = Session.get('saleDetailObj');
    selector[this._id] = {
      saleId: params.invoiceId,
      productId: this._id,
      price: this.price,
      amount: this.price,
      quantity: 1
    }
    Session.set('saleDetailObj', selector);
  },
  'click .icon-remove' (event) {
    let selector = Session.get('saleDetailObj');
    delete selector[this._id];
    Session.set('saleDetailObj', selector)
  },
  'click .ion-android-add' (event) {
    let selector = Session.get('saleDetailObj')
    let current = $(event.currentTarget);
    let qty = current.parents('.custom-qty').find('.qty').text();
    let currentQty = parseInt(qty) + 1;
    current.parents('.custom-qty').find('.qty').text(currentQty);
    setSelector(selector, currentQty, this);
  },
  'click .ion-android-remove' (event) {
    let selector = Session.get('saleDetailObj')
    let current = $(event.currentTarget);
    let qty = current.parents('.custom-qty').find('.qty').text();
    if (qty != '1') {
      let currentQty = parseInt(qty) - 1;
      current.parents('.custom-qty').find('.qty').text(currentQty);
      setSelector(selector, currentQty, this);
    }
  },
  'keyup .qty' (event) {
    let selector = Session.get('saleDetailObj');
    let currentQty = $(event.currentTarget).val();
    if (currentQty != '0' && currentQty != '') {
      setSelector(selector, parseInt(currentQty), this);
    }
    if (currentQty == '0') {
      $(event.currentTarget).val('1')
    }
  },
  'keypress .qty' (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
});


Template.productList.helpers({
  productAdded(productId) {
    let selector = Session.get('saleDetailObj');
    if (!_.isUndefined(selector[productId])) {
      if (selector[productId].productId == productId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
})


var setSelector = (selector, currentQty, self) => {
  selector[self._id].amount = self.price * currentQty;
  selector[self._id].quantity = currentQty;
  Session.set('saleDetailObj', selector);
}
