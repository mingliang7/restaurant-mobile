Template.unit.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('units');
    }.bind(this));
};
Template.unit.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.unit.helpers({
    units(){
        return Restaurant.Collection.Units.find()
    }
});

Template.unit.events({
  'click [data-action="confirm"]'(event, template) {
       IonPopup.confirm({
           title: 'Are you sure?',
           template: `Detele ${this.name}?`,
           onOk: () => {
               Meteor.call('removeUnit', this._id);
           },
           onCancel: function () {
               console.log('Cancelled');
           }
       });
   }
});
