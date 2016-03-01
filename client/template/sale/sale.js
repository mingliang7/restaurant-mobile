Template.restaurantSale.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('tableLocations');
  });
}

Template.restaurantSale.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
}

Template.restaurantSale.helpers({
  tableLocations() {
    return Restaurant.Collection.TableLocations.find({}, {sort: {name: 1}});
  },
  goToTable() {
    return `/restaurant/sale/${this._id}` ;
  }
});
