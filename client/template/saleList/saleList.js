Deps.autorun(function() {
  if (Session.get('searchListQuery')) {
    Meteor.subscribe('productsSearch', Session.get('searchListQuery'), Session.get('limit'), Session.get('filter'));
  }
});
Template.restaurantSaleList.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("categories");
  });
};
Template.restaurantSaleList.rendered = function() {
  Session.set('limit', 10);
  Session.set('filter', {});
  try {
    this.autorun(()=>{
      if(!this.subscription.ready()){
        IonLoading.show();
      }else{
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
};
Template.restaurantSaleList.events({
  'keyup input.search': function(event, template) {
    Session.set('searchListQuery', event.target.value);
    Session.set('limit', 10);
  },
  'click .order' (event) {
    let saleDetailObj = Session.get('saleDetailObj');
    if (!_.has(saleDetailObj, this._id)) {
      this.quantity = 1;
      this.discount = 0;
      this.saleId = Router.current().params.invoiceId;
      this.amount = this.price * this.quantity;
      saleDetailObj[this._id] = this;
    } else {
      saleDetailObj[this._id].quantity = saleDetailObj[this._id].quantity + 1;
      saleDetailObj[this._id].amount = saleDetailObj[this._id].quantity * saleDetailObj[this._id].price;
    }
    Session.set('saleDetailObj', saleDetailObj)
    var selector = Session.get('saleDetailObj');
    Meteor.call('insertSaleDetail', selector, function(err, result) {
      if (err) {
        Bert.alert(`កម្ម៉ង់ត្រូវបានច្រានចោល!`, 'danger', 'growl-bottom-right', 'fa-remove')
        Session.set('saleDetailObj', {});
      } else {
        Bert.alert(`កម្ម៉ង់បានសម្រេច!`, 'success', 'growl-bottom-right', 'fa-check')
        Session.set('saleDetailObj', {});
        let params = Router.current().params;
        Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`)
      }
    });

  },
  'click .remove-sale-detail' () {
    let saleDetailObj = Session.get('saleDetailObj');
    delete saleDetailObj[this._id]
    Session.set('saleDetailObj', saleDetailObj)
  },
  'keyup .discount' (e) {
    let saleDetailObj = Session.get('saleDetailObj');
    let currentValue = $(e.currentTarget).val();
    if (currentValue != '0') {
      saleDetailObj[this._id].discount = parseFloat(currentValue);
      saleDetailObj[this._id].amount = checkDiscount(e);
    }
    if (currentValue == '' || currentValue == '0') {
      $(e.currentTarget).val('0')
      saleDetailObj[this._id].discount = 0;
      saleDetailObj[this._id].amount = checkDiscount(e);
    }
    Session.set('saleDetailObj', saleDetailObj)
  },
  'click .discount' (e) {
    $(e.currentTarget).select()
  },
  "keypress .discount" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  'keyup .quantity' (e) {
    let saleDetailObj = Session.get('saleDetailObj');
    let currentQty = [this._id].quantity;
    let currentValue = $(e.currentTarget).val();
    if (currentValue != '0') {
      saleDetailObj[this._id].quantity = parseFloat(currentValue);
      saleDetailObj[this._id].amount = checkDiscount(e);
    }
    if (currentValue == '' || currentValue == '0') {
      $(e.currentTarget).val(currentQty);
      saleDetailObj[this._id].quantity = 1;
      saleDetailObj[this._id].amount = checkDiscount(e);
    }
    Session.set('saleDetailObj', saleDetailObj);
  },
  'click .quantity' (e) {
    $(e.currentTarget).select();
  },
  "keypress .quantity" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  'keyup .price' (e) {
    let saleDetailObj = Session.get('saleDetailObj');
    let currentPrice = saleDetailObj[this._id].price;
    let currentValue = $(e.currentTarget).val();
    if (currentValue != '0') {
      saleDetailObj[this._id].price = parseFloat(currentValue);
      saleDetailObj[this._id].amount = checkDiscount(e);
    }
    if (currentValue == '' || currentValue == '0') {
      $(e.currentTarget).val(currentPrice);
      saleDetailObj[this._id].price = currentPrice;
      saleDetailObj[this._id].amount = checkDiscount(e);

    }
    Session.set('saleDetailObj', saleDetailObj)
  },
  'click .category'(e){
    let categoryObj = Session.get('filter');
    if($(e.currentTarget).prop('checked')){
      categoryObj[this._id] = this._id;
    }else{
      delete categoryObj[this._id];
    }
    Session.set('filter', categoryObj);
  },
  'click .price' (e) {
    $(e.currentTarget).select()
  },
  "keypress .price" (evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  },
  'click .confirm-order' () {
    var selector = Session.get('saleDetailObj');
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `យល់ព្រមកម្ម៉ង់?`,
      onOk: () => {
        Meteor.call('insertSaleDetail', selector, function(err, result) {
          if (err) {
            Bert.alert(`កម្ម៉ង់ត្រូវបានច្រានចោល!`, 'danger', 'growl-bottom-right', 'fa-remove')
            Session.set('saleDetailObj', {});
          } else {
            Bert.alert(`កម្ម៉ង់បានសម្រេច!`, 'success', 'growl-bottom-right', 'fa-check')
            Session.set('saleDetailObj', {});
            let params = Router.current().params;
            Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${params.invoiceId}`)
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  },
  'click .loadMoreProduct' () {
    let limit = Session.get('limit') + 5;
    Session.set('limit', limit);
  }
});

Template.restaurantSaleList.helpers({
  products: function() {
    return Restaurant.Collection.Products.search(Session.get('searchListQuery'), Session.get('limit'), Session.get('filter'));
  },
  searchListQuery: function() {
    return Session.get('searchListQuery');
  },
  orderList() {
    let arr = [];
    let saleDetails = Session.get("saleDetailObj");
    for (let k in saleDetails) {
      arr.push(saleDetails[k])
    }
    return arr;
  },
  saleDetailExist() {
    let saleDetails = Session.get('saleDetailObj');
    if (!_.isEmpty(saleDetails)) {
      return true;
    }
    return false;
  },
  categories(){
    return Restaurant.Collection.Categories.find({}, {sort:{name: 1}});
  }

});


var checkDiscount = (e) => {
  let parents = $(e.currentTarget).parents('.row'); //find parents element of current obj
  let currentPrice = parents.find($('.price')).val()
  let currentDiscount = parents.find('.discount').val();
  let currentQty = parents.find($('.quantity')).val();
  let totalAmount = (parseFloat(currentPrice) * parseFloat(currentQty)) * (1 - parseFloat(currentDiscount) / 100);
  console.log(typeof(totalAmount));
  return totalAmount;
}
