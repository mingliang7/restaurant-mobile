Meteor.methods({
  removeTable: function(id) {
    Restaurant.Collection.Tables.remove(id);
  }
});
