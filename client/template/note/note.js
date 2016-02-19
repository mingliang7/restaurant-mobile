Template.restaurantNote.created =function() {
  this.autorun(function(){
    this.subscription = Meteor.subscribe('notes');
  }.bind(this));
};


Template.restaurantNote.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
}

Template.restaurantNote.helpers({
  customers(){
    return Restaurant.Collection.Notes.find();
  }
});
