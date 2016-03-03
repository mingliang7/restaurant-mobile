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
        type: Date,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម"
    },
    toDate:{
        type:Date,
        label: "កាលបរិច្ឆេទបញ្ចប់"

    }
});