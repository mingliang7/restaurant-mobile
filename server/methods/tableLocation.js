Meteor.methods({
  removeTableLocation: function(id) {
    Restaurant.Collection.TableLocations.remove(id);
  }
});
