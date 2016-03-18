Restaurant.Schema.OutstandingReport = new SimpleSchema({
    customerId:{
        type:String,
        label:"អតិថិជន",
        autoform: {
          firstOption: 'All'
        },
        optional:true
    },
    date: {
        type: String,
        label: "កាលបរិច្ឆេទ"
    }

});
