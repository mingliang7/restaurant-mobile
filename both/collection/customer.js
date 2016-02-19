Restaurant.Collection.Customers = new Mongo.Collection("restaurant_customers");
Restaurant.Schema.Customers = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.gender();
            }
        }
    },
    phone: {
        type: String,
        label: "Phone",
        optional:true
    },
    address: {
        type: String,
        label: "Address",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        },
        optional:true
    }
});
Restaurant.Collection.Customers.attachSchema(Restaurant.Schema.Customers);
