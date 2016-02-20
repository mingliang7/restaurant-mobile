Template.category.created = function() {
  this.autorun(function() {
    this.subscription = Meteor.subscribe('categories');
  }.bind(this));
};
Template.category.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.category.helpers({
  categories() {
    return Restaurant.Collection.Categories.find()
  }
});

Template.category.events({
  'click [data-action="confirm"]' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'Are you sure?',
      template: `Detele ${name}?`,
      onOk: () => {
        Meteor.call('removeCategory', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`Removed ${name}`, 'success', 'growl-bottom-right', 'fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled','info','growl-bottom-right','fa-info')
      }
    });
  }
});
