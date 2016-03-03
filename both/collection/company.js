Restaurant.Collection.Company = new Mongo.Collection("restaurant_company");
Restaurant.Schema.Company = new SimpleSchema({
    khName: {
        type: String,
        label: "ឈ្មោះក្រុមហ៊ុន (ខ្មែរ)",
        max: 200
    },
    khShortName: {
        type: String,
        label: "ឈ្មោះក្រុមហ៊ុនខ្លី (ខ្មែរ)",
        max: 200
    },
    enName: {
        type: String,
        label: "ឈ្មោះក្រុមហ៊ុន (អង់គ្លេស)",
        max: 200
    },
    enShortName: {
        type: String,
        label: "ឈ្មោះក្រុមហ៊ុនខ្លី (អង់គ្លេស)",
        max: 200
    },
    khAddress: {
        type: String,
        label: "អាសយដ្ឋាន (ខ្មែរ)",
        max: 500
    },
    enAddress: {
        type: String,
        label: "អាសយដ្ឋាន (អង់គ្លេស)",
        max: 500
    },
    telephone: {
        type: String,
        label: "លេខទូរស័ព្ទ",
        max: 100
    },
    email: {
        type: String,
        label: "អ៊ីម៉ែល",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    website: {
        type: String,
        label: "គេហទំព័រ",
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    baseCurrency:{
        type:String,
        label:"រូបិយប័ណ្ណគោល",
        autoform: {
            type: "select",
            options: function () {
                return Restaurant.List.currency();
            }
        }

    }

});
Restaurant.Collection.Company.attachSchema(Restaurant.Schema.Company);
