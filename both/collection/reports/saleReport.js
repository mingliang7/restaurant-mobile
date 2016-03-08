/**
 * Schema
 */
Restaurant.Schema.SaleReport = new SimpleSchema({
    customerId: {
        type: String,
        label: "អតិថិជន",
        optional: true
    },
    fromDate: {
        type: String,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម"
    },
    toDate: {
        type: String,
        label: "កាលបរិច្ឆេទបញ្ចប់"

    },
    status: {
        type: String,
        label: "ប្រភេទវិក័យប័ត្រ",
        optional: true
    },
    staffId:{
        type:String,
        label:"បុគ្គលិក",
        optional: true
    }
});
