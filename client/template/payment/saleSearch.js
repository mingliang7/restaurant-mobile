Deps.autorun(function() {
  if (Session.get('searchSaleQuery') ||  Session.get('filterByLocation') || Session.get('saleStatus') || Session.get('queryDate')) {
    Meteor.subscribe('searchSaleByTable', Session.get('searchSaleQuery'), Session.get('filterByLocation'), Session.get('saleStatus'), Session.get('queryDate'), Session.get('searchLimit'));
  }
});
Template.restaurantActivePaymentSearch.created = function() {
  Session.set('filterByLocation', {});
  Session.set('searchLimit', 5);
  Session.set('saleStatus', 'active');
  Session.set('queryDate', undefined);
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("tableLocations");
    Meteor.subscribe("activeSales", Session.get('activeSaleLimit'));
  });
};
Template.restaurantActivePaymentSearch.rendered = function() {
  $('[name="date"]').datetimepicker();
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
};
Template.restaurantActivePaymentSearch.events({
  'keyup input': function(event, template) {
    Session.set('searchSaleQuery', event.target.value);
  },

  'click a': function(event, template) {
    IonModal.close();
  },
  'change .location' (event) {
    let locations = Session.get('filterByLocation');
    if ($(event.currentTarget).prop('checked')) {
      locations[this._id] = this._id;
    } else {
      delete locations[this._id];
    }
    Session.set('searchSaleQuery', ''); //reactive search query
    Session.set('filterByLocation', locations);
  },
  'change .status' (e) {
    let currentProp = $(e.currentTarget).prop('checked');
    if (currentProp) {
      $('.status-text').text('Active');
      Session.set('saleStatus', 'active');
    } else {
      $('.status-text').text('Inactive');
      Session.set('saleStatus', 'closed');
    }
  },
  'change [name="date"]' (e) {
      Session.set('queryDate', $(e.currentTarget).val());
  },
  'click .loadMore'(){
    let limit = Session.get('searchLimit') + 5;
    Session.set('searchLimit', limit);
  }
});

Template.restaurantActivePaymentSearch.helpers({
  hasMore(){
    let limit = Session.get('searchLimit');
    let count = Counts.get('activeSalesCount');
    return limit < count;
  },
  products: function() {
    let filter = [];
    let locations = Session.get('filterByLocation');
    if (!_.isEmpty(locations)) {
      for (let k in locations) {
        filter.push(locations[k]);
      }
    }
    let restaurants = Restaurant.Collection.Sales.searchByTable(Session.get('searchSaleQuery'), filter, Session.get('saleStatus'), Session.get('queryDate'), Session.get('searchLimit'));
    return restaurants;
  },
  saleIsNotZero(){
    let filter = [];
    let locations = Session.get('filterByLocation');
    if (!_.isEmpty(locations)) {
      for (let k in locations) {
        filter.push(locations[k]);
      }
    }
    let sales = Restaurant.Collection.Sales.searchByTable(Session.get('searchSaleQuery'), filter, Session.get('saleStatus'),Session.get('queryDate'));
    if(sales.count() > 0){
      return true;
    }
    return false;
  },
  searchQuery: function() {
    return Session.get('searchSaleQuery');
  },
  goToActivePaymentInvoice() {
    let status = Session.get('saleStatus');
    if(status == 'active'){
      return `/restaurant/sale/${this.tableLocation}/table/${this.tableId}/saleInvoice/${this._id}`;
    }else{
      return `/restaurant/payment/${this._id}/show`;
    }
  },
  locations() {
    return Restaurant.Collection.TableLocations.find();
  }
});
