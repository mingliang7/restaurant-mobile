Deps.autorun(function() {
  if (Session.get('searchQuery')) {
    Meteor.subscribe('productsSearch', Session.get('searchQuery'));
  }
});

Template.productSearch.events({
  'keyup input': function (event, template) {
    Session.set('searchQuery', event.target.value);
  },

  'click a': function (event, template) {
    IonModal.close();
  }
});

Template.productSearch.helpers({
  products: function() {
    return Restaurant.Collection.Products.search(Session.get('searchQuery'));
  },
  searchQuery: function() {
    return Session.get('searchQuery');
  }
});
