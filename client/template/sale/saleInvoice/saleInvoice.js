Template.restaurantSaleTableSaleInvoice.created = function() {
  let saleId = Router.current().params.invoiceId;
  let limit = Session.set('saleDetailLimited', 5)
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("sale", saleId);
    this.subscribe = Meteor.subscribe("saleDetails", saleId, limit);
    this.subscribe = Meteor.subscribe("saleDetailCount", saleId);
  });
};

Template.restaurantSaleTableSaleInvoice.rendered = function() {
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

Template.restaurantSaleTableSaleInvoice.helpers({
  invoiceNumber() {
    let invoiceId = Router.current().params.invoiceId;
    return `វិក័យប័ត្រលេខ: ${invoiceId}`;
  },
  saleDetails() {
    let limit = Session.get('saleDetailLimited');
    let saleId = Router.current().params.invoiceId;
    return Restaurant.Collection.SaleDetails.find({
      saleId: saleId
    }, {
      sort: {
        _id: 1
      },
      limit: limit
    });
  },
  saleInvoice() {
    return Restaurant.Collection.Sales.findOne();
  },
  goToPayment() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/payment`;
  },
  hasMore() {
    let currentLimited = Session.get('saleDetailLimited');
    let counts = Counts.get('saleDetailCount');
    return currentLimited < counts
  }
});
Template.restaurantSaleTableSaleInvoice.events({
  "click .loadMore" () {
    let saleId = Router.current().params.invoiceId;
    let limit = Session.get('saleDetailLimited') + 5;
    Session.set('saleDetailLimited', limit);
    let sub = Meteor.subscribe("saleDetails", saleId, limit);

  }
});

Template._sale_invoice_tabs.helpers({
  goToCheckout() {
    Session.set('saleDetailObj', {});
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
  }
});

Template.saleDetail.events({
  'click .remove-sale-detail' () {
    let data = this;
    IonPopup.confirm({
      title: 'តើអ្នកត្រូវការលុបឬ?',
      template: `លុបទំនិញ ${data._product._category.name}${data._product.name}?`,
      onOk: () => {
        Meteor.call('removeSaleDetail', data._id, (err, result) => {
          if (err) {
            Bert.alert(`លុបមិនបានជោគជ័យ! ${data._product.name}`, 'danger', 'growl-bottom-right', 'fa-remove')
          } else {
            Bert.alert(`លុបបានជោគជ័យ! ${data._product.name}`, 'success', 'growl-bottom-right', 'fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSale
Template.tableHeader.helpers({
  goToEditSale() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSale`;
  }
})

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editDiscount

Template.saleInvoiceTotal.helpers({
  multiply: function(val1, val2, id) {
    debugger;
    if (val1 != null && val2 != null) {
      var value = (val1 * val2);
      if (id != null && id == "KHR") {
        value = roundRielCurrency(value);
        return numeral(value).format('0,0.00');
      }
      return numeral(value).format('0,0.00');
    }
  },
  exchangeRate: function() {
    debugger;
    let invoiceId = Router.current().params.invoiceId;
    var sale = Restaurant.Collection.Sales.findOne(invoiceId);
    if (sale != null) {
      var selector = {
        _id: sale.exchangeRateId
      };
      return ReactiveMethod.call('findOneRecord', 'Restaurant.Collection.ExchangeRates', selector, {});
      // return Restaurant.Collection.ExchangeRates.findOne(sale.exchangeRateId);
    } else {
      var id = "";
      var company = Restaurant.Collection.Company.findOne();
      if (company != null) {
        id = company.baseCurrency;
      }
      var selector = {
        base: id
      };
      var option = {
        sort: {
          _id: -1,
          createdAt: -1
        }
      };
      return ReactiveMethod.call('findONeRecord', 'Restaurant.Collection.ExchangeRates', selector, option);
      /*return Restaurant.Collection.ExchangeRates.findOne({
       base: id,
       }, {sort: {_id: -1, createdAt: -1}});*/
    }

  },
  goToEditDiscount() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editDiscount`;
  },
  saleInvoice() {
    return Restaurant.Collection.Sales.findOne();
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSaleDetail/:saleDetailId

Template.saleDetail.helpers({
  goToSaleDetailEdit() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSaleDetail/${this._id}`;
  }
})
