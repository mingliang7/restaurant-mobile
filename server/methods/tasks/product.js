Meteor.methods({
  fetchProduct(assetFile) {
    let products  = JSON.parse(Assets.getText(`products/${assetFile}`)) //fetch products from private/products file;
    let index = 0;
    if (products.length > 0) {
      products.forEach(function(product) {
        Restaurant.Collection.Products.insert(product)
        index += 1;
      });
    }
    console.log(products.length);
  }
});
