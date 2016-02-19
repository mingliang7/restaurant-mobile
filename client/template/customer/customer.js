Template.restaurantCustomer.created =function() {
  this.autorun(function(){
    this.subscription = Meteor.subscribe('customers');
  }.bind(this));
};


Template.restaurantCustomer.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
}

Template.restaurantCustomer.helpers({
  customers(){
    return Restaurant.Collection.Customers.find();
  }
});
