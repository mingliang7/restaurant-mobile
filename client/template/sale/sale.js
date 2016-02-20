Template.restaurantSale.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('tableLocations');
  });
}

Template.restaurantSale.rendered = function() {
  this.autorun(() => {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  });
}

Template.restaurantSale.helpers({
  tableLocations() {
    return Restaurant.Collection.TableLocations.find();
  },
  goToTable() {
    return `/restaurant/sale/${this._id}` ;
  }
});
