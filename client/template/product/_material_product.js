Deps.autorun(function() {
  if (Session.get('materialQuery')) {
    Meteor.subscribe('materialSearch', Session.get('materialQuery'), Session.get('limit'));
  }
});

Template.materialProduct.rendered = function() {
  Session.set('limit', 30)
  $('[name="materialSearch"]').focus();
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
  materials: function() {
    return Restaurant.Collection.Materials.search(Session.get('materialQuery'), Session.get('limit'));
  },
  materialQuery: function() {
    return Session.get('materialQuery');
  }

});
