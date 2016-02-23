Restaurant.Collection.Staffs = new Mongo.Collection("restaurant_staffs");
Restaurant.Schema.Staffs = new SimpleSchema({
    name: {
        type: String,
        label: "ឈ្មោះ",
        unique: true,
        max: 200
    },
    startDate: {
        type: Date,
        label: "កាលបរិចេ្ឆទចាប់ផ្តើម"
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
    position: {
        type: String,
        label: "តួនាទី"
    },
    salary: {
        type: Number,
        label: "បា្រក់ខែ",
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
Restaurant.Collection.Staffs.attachSchema(Restaurant.Schema.Staffs);
