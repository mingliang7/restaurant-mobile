Template.restaurantMaterials.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe('materials', 500);
  });
}
Template.restaurantMaterials.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    })
  } catch (e) {

  }
}
Template.restaurantMaterials.helpers({
  materials() {
    return Restaurant.Collection.Materials.find({},{sort: {name: 1}});
  }
})

Template.restaurantMaterials.events({
  'click .remove-material' (event, template) {

  }
});
