Meteor.methods({
  removeCustomer: function(id) {
    Restaurant.Collection.Customers.remove(id);
  }
});
