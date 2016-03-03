Meteor.methods({
  removeProduct(id) {
    Restaurant.Collection.Products.remove(id);
  },
  queryProductTags(categoryId, tags, units, limit) {
    let limitProduct = []
    let index = 1;
    let selector = {};
    selector.categoryId = categoryId;
    selector.$text = {
      $search: tags.join(' ')
    }
    if (!_.isEmpty(units)) {
      selector['_unit.name'] = {
        $in: units
      }
    }
    console.log(selector)
    let products = Restaurant.Collection.Products.find(selector, {
      fields: {
        score: {
          $meta: 'textScore'
        }
      },
      sort: {
        score: {
          $meta: 'textScore'
        }
      },
      limit: limit
    });
    return {
      count: products.count(),
      products: products.fetch()
    };
  }
});
