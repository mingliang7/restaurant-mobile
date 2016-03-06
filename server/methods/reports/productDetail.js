Meteor.methods({
    getProductDetailReport: function (arg) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        var params = {};
        var content = [];
        var categoryId = arg.categoryId;
        var index = 1;
        if(categoryId != '') {
            params.categoryId = categoryId
        }
        /****** Title *****/
        var products = Restaurant.Collection.Products.find(params,{sort:{name:1}});
        products.forEach(function (product) {
            product.index = index;
            product.price=numeral(product.price).format('0,0.00');
            content.push(product);
            index++;
        });
        data.title = Restaurant.Collection.Company.findOne();
        var header = {};
        header.categoryId = categoryId == '' ? 'ទាំងអស់' : Restaurant.Collection.Categories.findOne(categoryId).name;

        /****** Header *****/
        data.header = header;
        /****** Content *****/
        if (content.length > 0) {
            data.content = content;
        }
        return data
    }
});