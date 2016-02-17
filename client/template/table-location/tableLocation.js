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

Template.TableLocations.events({
  'click [data-action="confirm"]': function (event, template) {
       IonPopup.confirm({
           title: 'Are you sure?',
           template: `Detele ${this.name}?`,
           onOk: () => {
               Meteor.call('removeCategory', this._id);
           },
           onCancel: function () {
               console.log('Cancelled');
           }
       });
   }
});
