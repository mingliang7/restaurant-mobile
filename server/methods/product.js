Meteor.methods({
  removeProduct(id) {
    Restaurant.Collection.Products.remove(id);
  },
  queryProductTags(categoryId, tags, limit) {
    let limitProduct = []
    let index = 1;
    console.log(tags.join(' '))
    let products = Restaurant.Collection.Products.find({
      categoryId: categoryId,
      $text: {
        $search: tags.join(' ')
      }
    }, {
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
