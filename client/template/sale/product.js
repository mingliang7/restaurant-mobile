Template.restaurantSaleCheckoutInvoiceCategoryProduct.created = function() {
  Session.set('limited', 12);
  this.autorun(() => {
    let params = Router.current().params;
    let categoryId = Router.current().params.categoryId;
    this.subscribe = Meteor.subscribe("tableByLocation", params.tableLocationId, params.tableId);
    this.subscribe = Meteor.subscribe('countProductByCategory', categoryId);
    this.subscribe = Meteor.subscribe('productByCategory', Router.current().params.categoryId, Session.get('limited'));
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
  currentPath() {
    let table = Restaurant.Collection.Tables.findOne(Router.current().params.tableId);
    return `ទីតាំងតុៈ ${table._tableLocation.name} > តុលេខៈ ${table.name} >​`
  },
  categoryName() {
    try {

      var product = Restaurant.Collection.Products.findOne({
        categoryId: Router.current().params.categoryId
      });
      if (product) {
        return product._category.name;
      } else {
        return 'គ្មានទំនិញ'
      }
    } catch (e) {}
  },
  products() {
    let limit = Session.get('limited')
    let categoryId = Router.current().params.categoryId;
    let categoryTags = Session.get('categoryTags');
    if (!_.isUndefined(categoryTags.search)) {
      let amountLimit = categoryTags.limit || 12;
      _.isEmpty(categoryTags.units) ? categoryTags.units = [] : categoryTags.units
      let result = ReactiveMethod.call('queryProductTags', Router.current().params.categoryId, categoryTags.search, categoryTags.units, amountLimit);
      if(!result){
        IonLoading.show();
      }else{
        IonLoading.hide();
        Session.set('productCountFromMethod', 1);
        return result.products;
      }
    }
    return Restaurant.Collection.Products.find({
      categoryId: categoryId
    }, {
      sort: {
        name: 1
      },
      limit: limit
    });
  },
  goToCategory() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
  },
  hasMore() {
    let productCount = Counts.get('productCount')
    let productLimit = Session.get('limited');
    let count = Session.get('productCountFromMethod');
    if (_.isUndefined(count)) {
      return productLimit < productCount;
    }
  }
});

Template.restaurantSaleCheckoutInvoiceCategoryProduct.events({
  'click .loadMore' (event) {
    let limit = Session.get('limited') + 12;
    Session.set('limited', limit);
    Meteor.subscribe('productByCategory', Router.current().params.categoryId, Session.get('limited'));
  },
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
