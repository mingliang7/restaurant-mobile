Meteor.methods({
  fetchProduct(unit, category, assetFile) {
    Meteor.call(`${category}`);
    Meteor.call(`${unit}`);
    Restaurant.Collection.Products.remove({});
    let products  = JSON.parse(Assets.getText(`products/${assetFile}`)); //fetch products from private/products file;
    let index = 1;
    if (products.length > 0) {
      products.forEach(function(product) {
        Restaurant.Collection.Products.insert(product);
        console.log(index);
        index += 1;
      });
    }
    console.log(products.length);
  }
});
