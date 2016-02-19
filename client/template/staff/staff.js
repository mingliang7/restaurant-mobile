Template.restaurantStaff.created =function() {
  this.autorun(function(){
    this.subscription = Meteor.subscribe('staffs');
  }.bind(this));
};


Template.restaurantStaff.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
}

Template.restaurantStaff.helpers({
  staffs(){
    return Restaurant.Collection.Staffs.find();
  }
});
