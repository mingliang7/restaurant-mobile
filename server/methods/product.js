Meteor.methods({
        removeProduct(id) {
            Restaurant.Collection.Products.remove(id);
        },
        queryProductTags(categoryId, tags, units, limit) {
            let limitProduct = []
            let index = 1;
            let selector = {};
            selector.categoryId = categoryId;
            if (tags.length > 0) {
                selector.$text = {
                    $search: tags.join(' ')
                }
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
        },
        productIsEmpty(id) {
            let saleDetail = Restaurant.Collection.SaleDetails.findOne({
                productId: id
            });
            if (!saleDetail) {
                return true;
            }
            return false;
        },
        fetchProductForScheme(query){
            if(!query || query == ''){
                return Restaurant.Collection.Products.find({}, {sort: {name: 1}, limit: 10}).fetch();
            }else{
                let q = new RegExp(query, 'i');
                return Restaurant.Collection.Products.find({$or: [
                    {
                        name: {$regex: q}
                    },
                    {
                        enName: {$regex: q}
                    }
                ]}, {limit: 10, sort: {name: 1}}).fetch();
            }
        },
        getProductBySchemeId(id){
            let product = Restaurant.Collection.Products.findOne(id);
            return product && product.name;
        }
});
