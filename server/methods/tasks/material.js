Meteor.methods({
  fetchMaterial(assetFile) {
    let materialsCount = Restaurant.Collection.MaterialCategories.find().count();
    if(materialsCount <= 0){
      Meteor.call('insertMaterialCategory');
    }
    Restaurant.Collection.Materials.remove({});
    let materials  = JSON.parse(Assets.getText(`products/${assetFile}`)); //fetch products from private/products file;
    let index = 1;
    if (materials.length > 0) {
      materials.forEach(function(product) {
        Restaurant.Collection.Materials.insert(product);
        console.log(index);
        index += 1;
      });
    }
    console.log(materials.length);
  }
});
