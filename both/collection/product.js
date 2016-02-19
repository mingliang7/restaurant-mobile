Images = new FS.Collection("images", {
    stores: [new FS.Store.GridFS("images", {})],
    filter: {
        maxSize: 1048576, // in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpg']
        },
        onInvalid: function (message) {
            if (Meteor.isClient) {
                alert(message);
            } else {
                console.log(message);
            }
        }
    }
});
Restaurant.Collection.Products = new Mongo.Collection("restaurant_products");
Restaurant.Schema.Products = new SimpleSchema({
    picture: {
        type: String,
        label: 'Choose file',
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images'
            }
        },
        optional: true
    },
    name: {
        type: String,
        label: "Name",
        max: 200
    }
    ,
    barcode: {
        type: String,
        label: "Barcode",
        unique: true
    }
    ,
    price: {
        type: Number,
        label: "Price",
        decimal: true
    }

    ,
    productType: {
        type: String,
        label: "Type",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.productType();
            }
        }
    }
    ,
    categoryId: {
        type: String,
        label: "Category",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.category();
            }
        }
    }
    ,
    unitId: {
        type: String,
        label: "Unit",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.unit();
            }
        }
    }
    ,
    status: {
        type: String,
        label: "Status",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.status();
            }
        }
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    }
    
})
;
Restaurant.Collection.Products.attachSchema(Restaurant.Schema.Products);

Images.allow({
    insert: function (userId, doc) {
        return true;
    },
    download: function (userId) {
        return true;
    }
});


