Product = new Mongo.Collection('products');
product = new SimpleSchema({
   categoryId: {
       type: String
   },
    name: {
        type: String

    },
    price: {
        type: Number,
        decimal: true
    },
    description:{
        type: String,
        optional: true
    }
});

Product.attachSchema(product)