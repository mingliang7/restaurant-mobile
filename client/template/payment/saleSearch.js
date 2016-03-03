Deps.autorun(function() {
  if (Session.get('searchSaleQuery')) {
    Meteor.subscribe('searchSaleByTable', Session.get('searchSaleQuery'), Session.get('filterByLocation'));
  }
});
Template.saleSearch.created = function(){
  Session.set('filterByLocation', {});
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("tableLocations");
  })
}
Template.saleSearch.rendered = function(){
  this.autorun(()=>{
    if(!this.subscription.ready()){
      IonLoading.show();
    }else{
      IonLoading.hide();
    }
  })
}
Template.saleSearch.events({
  'keyup input': function (event, template) {
    Session.set('searchSaleQuery', event.target.value);
  },

  'click a': function (event, template) {
    IonModal.close();
  },
  'change .location'(event){
    let locations = Session.get('filterByLocation')
    if($(event.currentTarget).prop('checked')){
      locations[this._id] = this._id;
    }else{
      delete locations[this._id]
    }
    Session.set('filterByLocation', locations);
  }
});

Template.saleSearch.helpers({
  products: function() {
    let filter = []
    let locations = Session.get('filterByLocation');
    if(!_.isEmpty(locations)){
      for(let k in locations){
        filter.push(locations[k]);
      }
    }
    return Restaurant.Collection.Sales.searchByTable(Session.get('searchSaleQuery'), filter);
  },
  searchQuery: function() {
    return Session.get('searchSaleQuery');
  },
  goToActivePaymentInvoice(){
    return `/restaurant/sale/${this.tableLocation}/table/${this.tableId}/saleInvoice/${this._id}`;
  },
  locations(){
    return Restaurant.Collection.TableLocations.find();
  }
});
