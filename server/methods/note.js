Meteor.methods({
  removeNote: function(id) {
    Restaurant.Collection.Notes.remove(id);
  }
});
