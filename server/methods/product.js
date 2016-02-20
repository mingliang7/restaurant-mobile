Meteor.methods({
  removeProduct(id) {
    Restaurant.Collection.Products.remove(id);
  }
});
