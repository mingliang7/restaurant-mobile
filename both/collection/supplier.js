Restaurant.Collection.Suppliers = new Mongo.Collection("restaurant_suppliers");
Restaurant.Schema.Suppliers = new SimpleSchema({
    name: {
        type: String,
        label: "ឈ្មោះ",
        unique: true,
        max: 200
    },
    gender: {
        type: String,
        label: "ភេទ",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.gender();
            }
        }
    },
    phone: {
        type: String,
        label: "លេខទូរស័ព្ទ",
        optional:true
    },
    address: {
        type: String,
        label: "អាសយដ្ឋាន",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        },
        optional:true
    }
});
Restaurant.Collection.Suppliers.attachSchema(Restaurant.Schema.Suppliers);
