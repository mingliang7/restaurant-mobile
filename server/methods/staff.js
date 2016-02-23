Meteor.methods({
  removeStaff: function(id) {
    Restaurant.Collection.Staffs.remove(id);
  }
});
