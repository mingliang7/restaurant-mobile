Template.tableLocations.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('tableLocations');
    }.bind(this));
};
Template.tableLocations.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.tableLocations.helpers({
    tableLocations(){
        return Restaurant.Collection.TableLocations.find()
    }
});

Template.tableLocations.events({
  'click .remove-table-location' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        Meteor.call('removeTableLocation', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`លុប ${name} បានជោគជ័យ !`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info')
      }
    });
  }
});
