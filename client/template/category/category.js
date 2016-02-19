Template.category.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('categories');
    }.bind(this));
};
Template.category.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.category.helpers({
    categories(){
        return Restaurant.Collection.Categories.find()
    }
});

Template.category.events({
  'click [data-action="confirm"]'(event, template) {
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
