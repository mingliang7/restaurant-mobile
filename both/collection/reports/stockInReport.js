/**
 * Schema
 */
Restaurant.Schema.StockInReport = new SimpleSchema({
    fromDate: {
        type: String,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម",
        optional:true
    },
    toDate: {
        type: String,
        label: "កាលបរិច្ឆេទបញ្ចប់",
        optional:true

    },
    status: {
        type: String,
        label: "ប្រភេទវិក័យប័ត្រ",
        optional: true,
        autoform:{
          firstOption: 'All'
        }
    }
});
