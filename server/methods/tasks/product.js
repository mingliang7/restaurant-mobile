/**
Category:
  001: អាហារពេលព្រឹក
  002: ម្ហូបអាំងចៀនពង
  003: សម្លរ
  004:​ ញាំុ
  005​: ម្ហូបឆា
**/


Meteor.methods({
  fetchProduct(assetFile) {
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
