Meteor.methods({
  addTagsToProduct() {
    Meteor.defer(() => {
      Meteor._sleepForMs(500);
      let tags = Sale.tags.name; //calling form both/app/sale.js
      checkTag(tags); //
    })
  },
  updateTag(productId, update) {
    Meteor.defer(() => {
      let tags = Sale.tags.name; //calling form both/app/sale.js
      checkTag(tags, productId, update);
    })
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
