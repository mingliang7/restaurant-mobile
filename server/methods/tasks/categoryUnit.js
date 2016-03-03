Meteor.methods({
  pushUnitToCategory(productId = {}) {
    Meteor.defer(() => {
      Meteor._sleepForMs(500);
      var products = Restaurant.Collection.Products.find(productId);
      if (products.count() > 0) {
        console.log(products.count())
        pushUnit(products)
      }
    });
  }
});
var pushUnit = (products) => {
  products.forEach((product) => {
    let unitName = Restaurant.Collection.Units.findOne(product.unitId).name;
    Restaurant.Collection.Categories.direct.update({
      _id: product.categoryId
    }, {
      $addToSet: {
        units: unitName
      }
    });
  });
}
