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
  categoryName(){
    try {
      return Restaurant.Collection.Products.findOne()._category.name;
    } catch (e) {
    }
  },
  products(){
    return Restaurant.Collection.Products.find();
  },
  goToCategory(){
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
  }
});
