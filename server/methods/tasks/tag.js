Meteor.methods({
  addTagsToProduct() {
    Meteor.defer(() => {
      Meteor._sleepForMs(500);
      let tags = Sale.tags.name; //calling form both/app/sale.js
      checkTag(tags); //
    })
  },
  updateTag(categoryId, productId, update) {
    Meteor.defer(() => {
      let category = Restaurant.Collection.Categories.findOne(categoryId);
      let tags = category.tags == undefined ? Sale.tags.name : category.tags; //calling form both/app/sale.js
      checkTag(tags, productId, update);
    })
  },
  updateProductTagByCategory(categoryId, tags){
    Meteor.defer(()=>{
      let products = Restaurant.Collection.Products.find({categoryId: categoryId});
      if(products.count > 0){
        products.forEach(function(product) {
          checkTag(tags, product._id, true)
        });
      }
    });
  }
});

var checkTag = (tags, productId, update) => {
  if(update){
    Restaurant.Collection.Products.direct.update(productId, {$unset: {tags: ''}});
  }
  for (let i = 0; i < tags.length; i++) {
    let regPattern = `${tags[i]}`
    let reg = new RegExp(regPattern, 'i') //match all case
    let selector = {};
    if(!_.isUndefined(productId)){
      selector._id = productId
    }
    selector.name =  {
      $regex: reg
    }
    let products = Restaurant.Collection.Products.find(selector);
    console.log(tags[i])
    if (products.count() > 0) {
      pushTags(products, tags[i]);
    }
  }
  console.log('..................Done...............');
}

var pushTags = (products, tag) => {
  products.forEach((product) => {
    Restaurant.Collection.Products.direct.update(product._id, {
      $addToSet: {
        tags: tag
      }
    });
    Restaurant.Collection.Categories.direct.update({
      _id: product.categoryId
    }, {
      $addToSet: {
        tags: tag
      }
    });
  });
}
