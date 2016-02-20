Template.restaurantSaleCheckoutInvoiceCategoryProduct.created = function() {
  Session.set('saleDetailObj', {});
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
    }
    Session.set('saleDetailObj', selector);
  },
  'click .icon-remove' (event) {
    let selector = Session.get('saleDetailObj');
    delete selector[this._id];
    Session.set('saleDetailObj', selector)
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
