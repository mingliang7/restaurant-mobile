Deps.autorun(function() {
  if (Session.get('searchSaleQuery')) {
    Meteor.subscribe('searchSaleByTable', Session.get('searchSaleQuery'), Session.get('filterByLocation'), Session.get('saleStatus'));
  }
});
Template.saleSearch.created = function() {
  Session.set('filterByLocation', {});
  Session.set('saleStatus', 'active');
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("tableLocations");
  })
}
Template.saleSearch.rendered = function() {
  this.autorun(() => {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  })
}
Template.saleSearch.events({
  'keyup input': function(event, template) {
    Session.set('searchSaleQuery', event.target.value);
  },

  'click a': function(event, template) {
    IonModal.close();
  },
  'change .location' (event) {
    let locations = Session.get('filterByLocation')
    if ($(event.currentTarget).prop('checked')) {
      locations[this._id] = this._id;
    } else {
      delete locations[this._id]
    }
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
  }
});

Template.saleSearch.helpers({
  products: function() {
    let filter = []
    let locations = Session.get('filterByLocation');
    if (!_.isEmpty(locations)) {
      for (let k in locations) {
        filter.push(locations[k]);
      }
    }
    return Restaurant.Collection.Sales.searchByTable(Session.get('searchSaleQuery'), filter, Session.get('saleStatus'));
  },
  saleIsNotZero(){
    let filter = []
    let locations = Session.get('filterByLocation');
    if (!_.isEmpty(locations)) {
      for (let k in locations) {
        filter.push(locations[k]);
      }
    }
    let sales = Restaurant.Collection.Sales.searchByTable(Session.get('searchSaleQuery'), filter, Session.get('saleStatus'));
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
      return `/restaurant/payment/${this._id}/show`
    }
  },
  locations() {
    return Restaurant.Collection.TableLocations.find();
  }
});
