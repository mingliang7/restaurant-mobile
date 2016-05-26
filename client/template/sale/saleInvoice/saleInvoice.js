Tracker.autorun(function() {
  if (Session.get('paramsInvoiceId')) {
    Meteor.subscribe("sale", Session.get('paramsInvoiceId'));
  }
  if (Session.get('searchListQuery')) {
    Meteor.subscribe('productsSearch', Session.get('searchListQuery'), Session.get('limit'));
  }
});


Template.restaurantSaleTableSaleInvoice.created = function() {
  let saleId = Router.current().params.invoiceId;
  Session.set('limit', 10)
  Session.set('saleDetailObj', {});
  Session.set('saleDetailLimited', 5) // using for limit
  Session.set('detachSaleDetailObj', {}) //using for detach sale detail
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("sale", saleId);
    this.subscribe = Meteor.subscribe("saleDetailCount", saleId);
    this.subscribe = Meteor.subscribe('productCount');
    this.subscribe = Meteor.subscribe("saleDetails", Router.current().params.invoiceId, Session.get('saleDetailLimited'));
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
    return Restaurant.Collection.Sales.findOne(Router.current().params.invoiceId);
  },
  goToPayment() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/payment`;
  },
  goToTable() {
    return `restaurant.select.table`;
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
    // return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`;
    return `/restaurant/saleList/location/${params.tableLocationId}/table/${params.tableId}/checkout/${params.invoiceId}`
  },
  goToTable() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}`;
  },
  noPayment() {
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.invoiceId);
    console.log(sale.paidAmount <= 0)
    if (sale.paidAmount <= 0) {
      return true;
    }
    return false;
  }
});

Template.saleDetail.events({
  'click .remove-sale-detail' () {
    let data = this;
    IonPopup.confirm({
      title: 'តើអ្នកត្រូវការលុបឬ?',
      template: `លុបទំនិញ ${data._product.name}?`,
      onOk: () => {
        Meteor.call('removeSaleDetail', data._id, (err, result) => {
          if (err) {
            Bert.alert(`លុបមិនបានជោគជ័យ! ${data._product.name}`, 'danger', 'growl-bottom-right', 'fa-remove')
          } else {
            // Bert.alert(`លុបបានជោគជ័យ! ${data._product.name}`, 'success', 'growl-bottom-right', 'fa-check')
          }
        });
      },
      onCancel: function() {

      }
    });
  },
  'click .detach' (e) {
    let numberOfCustomer = $('.numberOfCustomer').text().trim()
    let detachObj = Session.get('detachSaleDetailObj');
    let currentProp = $(e.currentTarget).prop('checked');
    let currentDate = $('.saleDate').text().trim();
    if (currentProp) {
      detachObj[this._id] = this._id
      detachObj[this._id] = {
        saleDate: currentDate,
        oldSaleId: this.saleId,
        defaultQty: this.quantity,
        discount: this.discount == undefined ? 0 : this.discount,
        numberOfCustomer: numberOfCustomer

      }
    } else {
      delete detachObj[this._id]
    }
    Session.set('detachSaleDetailObj', detachObj);
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSale
Template.tableHeader.helpers({
  goToEditSale() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSale`;
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editDiscount
Template.saleInvoiceTotal.events({
  "click .save-officer-cheque"(){
    debugger
    let invoiceId = Router.current().params.invoiceId;
     Meteor.call('saveOfficerCheque', invoiceId, (err,result)=>{
       if(err){
         alertify.error(err.message);
       }else{
         alertify.success('រក្សាទុុកបានជោគជ័យ');
         Router.go('/restaurant/selectTable');
       }
     });
  }
});
Template.saleInvoiceTotal.helpers({
  isOfficerCheque(type){
    if(type == 'officer'){
      return true;
    }
    return false;
  },
  goToPayment() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/payment`;
  },
  multiply: function(val1, val2, id) {
    debugger;
    if (val1 != null && val2 != null) {
      var value = (val1 / val2);
      if (id != null && id == "KHR") {
        value = roundRielCurrency(value);
        return numeral(value).format('0,0.00');
      }
      return numeral(value).format('0,0.00');
    }
  },
  exchangeRate: function() {
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
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.invoiceId);
    return sale;
  }
});

//go to /restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSaleDetail/:saleDetailId

Template.saleDetail.helpers({
  goToSaleDetailEdit() {
    let params = Router.current().params;
    return `/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}/editSaleDetail/${this._id}`;
  },
  hasDetachSaleDetail() {
    let id = this._id;
    debugger
    let saleDetailObj = Session.get('detachSaleDetailObj');
    if (!_.isEmpty(saleDetailObj)) {
      if (_.has(saleDetailObj, id)) {
        let qty = saleDetailObj[id].qtyChanged == undefined ? '' : saleDetailObj[id].qtyChanged;
        return {
          qty: qty,
          flag: true
        }
      }
    }
    return {
      flag: false
    };
  },
  noPayment() {
    let sale = Restaurant.Collection.Sales.findOne(Router.current().params.invoiceId);
    if (sale.paidAmount <= 0) {
      return true
    }
    return false;
  }
})

Template._sale_invoice_tabs.helpers({
  hasDetachSaleDetail() {
    let saleDetailObj = Session.get('detachSaleDetailObj');
    if (!_.isEmpty(saleDetailObj)) {
      return true
    }
    return false;
  }
});


Template._sale_invoice_tabs.events({
  'click .cancel-and-copy' () {
    let params = Router.current().params;
    let invoiceId = params.invoiceId;
    let tableLocationId = params.tableLocationId;;
    let tableId = params.tableId;
    let selector = {};
    selector.saleDate = new Date();
    selector.status = "active";
    selector.tableId = tableId;
    selector.tableLocation = tableLocationId;
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `តើអ្នកពិតជាចង់ផ្អាកនិងកូពីវិក័យប័ត្រមួយនេះឬ?`,
      onOk: () => {
        IonLoading.show()
        Meteor.call('cancelAndCopy', selector, invoiceId, (err, result) => {
          if (err) {
            Bert.alert(`ផ្អាកវិក័យប័ត្រនិងកូពីមិនបានជោគជ័យ!`, 'danger', 'growl-bottom-right', 'fa-remove')
            IonLoading.hide()
          } else {
            let params = Router.current().params;
            IonLoading.hide()
            Bert.alert(`ផ្អាកវិក័យប័ត្រនិងកូពីបានជោគជ័យ!!`, 'success', 'growl-bottom-right', 'fa-check')
            Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${result}`);
          }
        });
      },
      onCancel: function() {
        // Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  },
  'click .cancel-invoice' () {
    let invoiceId = Router.current().params.invoiceId;
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `តើអ្នកពិតជាចង់ផ្អាកវិក័យប័ត្រមួយនេះឬ?`,
      onOk: () => {
        IonLoading.show()
        Meteor.call('cancelInvoice', invoiceId, (err, result) => {
          if (err) {
            Bert.alert(`ផ្អាកវិក័យប័ត្រមិនបានជោគជ័យ!`, 'danger', 'growl-bottom-right', 'fa-remove')
            IonLoading.hide()
          } else {
            let params = Router.current().params;
            IonLoading.hide()
            Bert.alert(`ផ្អាកវិក័យប័ត្របានជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            Router.go('/restaurant/selectTable');
          }
        });
      },
      onCancel: function() {
        // Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  },
  'click .sale-print' () {
    let invoiceId = Router.current().params.invoiceId;
    Meteor.call('setPrintToFalse', invoiceId);
    Router.go('/restaurant/sale-print/' + invoiceId);
  },
  'click .detachSaleDetail' () {
    let params = Router.current().params;
    let detachObj = Session.get('detachSaleDetailObj');
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `តើអ្នកពិតជាចង់បំបែកវិក័យប័ត្រ?`,
      onOk: () => {
        IonLoading.show()
        Meteor.call('detachSaleDetail', params.tableId, params.tableLocationId, detachObj, (err, result) => {
          if (err) {
            Bert.alert(`បំបែកវិក័យប័ត្រមិនបានជោគជ័យ!`, 'danger', 'growl-bottom-right', 'fa-remove')
            IonLoading.hide()
          } else {
            let params = Router.current().params;
            IonLoading.hide()
            Bert.alert(`បំបែកវិក័យប័ត្របានជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            Session.set('detachSaleDetailObj', {});
            Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${result}`)
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  }
});


let goToNewInvoice = (location, tableId, saleId) => {
  console.log(saleId)
  IonPopup.confirm({
    title: 'បញ្ជាក់',
    template: `ចូលទៅកាន់វិក័យប័ត្រថ្មី`,
    onOk: () => {
      Router.go(`/restaurant/sale/${location}/table/${tableId}/saleInvoice/${saleId}}`)
    },
    onCancel: function() {
      console.log('cancel')
    }
  });
}


Template.restaurantSaleList.helpers({
  hasMoreProducts() {
    let limit = Session.get('limit');
    let productCount = Counts.get('productCounts');
    if (limit < productCounts) {
      return true
    }

    return false;
  }
})
