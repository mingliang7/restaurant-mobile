Deps.autorun(function() {
  if (Session.get('materialQuery')) {
    Meteor.subscribe('productsSearch', Session.get('materialQuery'), Session.get('limit'), ['material']);
  }
});

Template.materialProduct.rendered = function() {
  Session.set('limit', 10)
}
Template.materialProduct.events({
  'keyup [name="materialSearch"]': function(event, template) {
    Session.set('materialQuery', event.target.value);
  },
  'click .loadMore' () {
    let amount = Session.get('limit');
    Session.set('limit', amount + 5);
  },
  'click a': function(event, template) {
    IonModal.close();
  },
  'click .add-item' (event, template) {
    $('.ingradientName').val(`${this.name}(${this._unit.name})`);
    $('.ingradientId').val(this._id);
  }
});

Template.materialProduct.helpers({
  products: function() {
    return Restaurant.Collection.Products.search(Session.get('materialQuery'), Session.get('limit'), ['material']);
  },
  materialQuery: function() {
    return Session.get('materialQuery');
  }

});
