Meteor.methods({
  removeUnit(id) {
    Restaurant.Collection.Units.remove(id);
  }
});
