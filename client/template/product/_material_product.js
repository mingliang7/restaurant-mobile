Deps.autorun(function() {
  if (Session.get('materialQuery')) {
    Meteor.subscribe('productsSearch', Session.get('materialQuery'), Session.get('limit'), ['material']);
  }
});

Template.materialProduct.rendered = function(){
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
  'click [data-action="confirm"]' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        Meteor.call('removeProduct', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`, 'danger', 'growl-bottom-right', 'fa-remove')
          } else {
            Bert.alert(`លុប ${name}​ បានជោគជ័យ !`, 'success', 'growl-bottom-right', 'fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
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
