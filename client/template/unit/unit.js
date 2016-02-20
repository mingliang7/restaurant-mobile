Template.unit.created = function() {
  this.autorun(function() {
    this.subscription = Meteor.subscribe('units');
  }.bind(this));
};
Template.unit.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.unit.helpers({
  units() {
    return Restaurant.Collection.Units.find()
  }
});

Template.unit.events({
  'click [data-action="confirm"]' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'Are you sure?',
      template: `Detele ${name}?`,
      onOk: () => {
        Meteor.call('removeUnit', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`, 'danger', 'growl-bottom-right', 'fa-remove')
          } else {
            Bert.alert(`Removed ${name}`, 'success', 'growl-bottom-right', 'fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  }
});
