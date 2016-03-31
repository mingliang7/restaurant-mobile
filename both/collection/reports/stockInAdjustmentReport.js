/**
 * Schema
 */
Restaurant.Schema.StockInAdjustmentReport = new SimpleSchema({
    fromDate: {
        type: String,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម",
        optional:true
    },
    toDate: {
        type: String,
        label: "កាលបរិច្ឆេទបញ្ចប់",
        optional:true

    }
});
