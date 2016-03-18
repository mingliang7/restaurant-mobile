/**
 * Schema
 */
Restaurant.Schema.SaleDetailReport = new SimpleSchema({
    categoryId: {
        type: String,
        label: "ផ្នែក",
        autoform: {
          firstOption: 'All'
        },
        optional:true
    },
    customerId:{
        type:String,
        label:"អតិថិជន",
        autoform: {
          firstOption: 'All'
        },
        optional:true

    },
    fromDate: {
        type: String,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម",
        optional:true
    },
    toDate:{
        type:String,
        label:"កាលបរិច្ឆេទបញ្ចប់",
        optional:true
    },
    staffId:{
      type:Date,
      label:"បុគ្កលិក",
      autoform: {
        firstOption: 'All'
      },
      optional:true
    }
});
