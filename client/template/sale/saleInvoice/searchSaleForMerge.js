Deps.autorun(function() {
  if (Session.get('querySaleForMerge')) {
    Meteor.subscribe('searchSaleForMerge', Session.get('querySaleForMerge'), Router.current().params.invoiceId);
  }
});

Template.searchSaleForMerge.events({
  'keyup input': function(event, template) {
    Session.set('querySaleForMerge', event.target.value);
  },

  'click a': function(event, template) {
    IonModal.close();
  }
});

Template.searchSaleForMerge.helpers({
  sales: function() {
    let sale = Restaurant.Collection.Sales.search(Session.get('querySaleForMerge'), Router.current().params.invoiceId);
    return sale
  },
  searchQuery: function() {
    return Session.get('querySaleForMerge');
  }
});
