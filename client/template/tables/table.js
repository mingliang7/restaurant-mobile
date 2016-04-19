Template.tables.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('tables');
    }.bind(this));
};
Template.tables.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.tables.helpers({
    tables(){
        return Restaurant.Collection.Tables.find({}, {sort: {name: 1}})
    },
    avatarUrl(){
        return 'https://placehold.it/350x150'
    },
    getTableShow: function() {
        return `/tables/${this._id}/categories`
    }
});

Template.tables.events({
  'click .remove-table' (event, template) {
    let name = this.name;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${name} ?`,
      onOk: () => {
        Meteor.call('removeTable', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${name}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`លុប ${name} បានជោគជ័យ​ !`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info')
      }
    });
  }
});
