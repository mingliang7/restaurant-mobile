Template.materialCategory.created = function() {
  this.autorun(function() {
    this.subscription = Meteor.subscribe('materialCategories');
  }.bind(this));
};
Template.materialCategory.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.materialCategory.helpers({
  categories() {
    return Restaurant.Collection.MaterialCategories.find({}, {sort: {name: 1}});
  }
});

Template.materialCategory.events({
  'click .remove-MaterialCategory' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        Meteor.call('removeMaterialCategory', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove');
          } else {
            Bert.alert(`លុប ${name} បានជោគជ័យ !`, 'success', 'growl-bottom-right', 'fa-check');
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info');
      }
    });
  }
});
