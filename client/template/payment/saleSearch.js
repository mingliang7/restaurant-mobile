Deps.autorun(function() {
  if (Session.get('searchSaleQuery')) {
    Meteor.subscribe('salesSearch', Session.get('searchSaleQuery'));
  }
});

Template.saleSearch.events({
  'keyup input': function (event, template) {
    Session.set('searchSaleQuery', event.target.value);
  },

  'click a': function (event, template) {
    IonModal.close();
  }
});

Template.saleSearch.helpers({
  products: function() {
    return Restaurant.Collection.Sales.search(Session.get('searchSaleQuery'));
  },
  searchQuery: function() {
    return Session.get('searchSaleQuery');
  },
  goToActivePaymentInvoice(){
    return `/restaurant/payment/${this._id}`
  }
});
