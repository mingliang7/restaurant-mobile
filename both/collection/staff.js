Restaurant.Collection.Staffs = new Mongo.Collection("restaurant_staffs");
Restaurant.Schema.Staffs = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    },
    startDate: {
        type: Date,
        label: "Start Date"
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
    position: {
        type: String,
        label: "Position"
    },
    salary: {
        type: Number,
        label: "Salary",
        decimal: true,
        optional:true
        //regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    status: {
        type: String,
        label: "Status",
        //optional: true,
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.status();
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
Restaurant.Collection.Staffs.attachSchema(Restaurant.Schema.Staffs);
