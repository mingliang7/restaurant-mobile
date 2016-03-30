Restaurant.Schema.OfficerChequeReport = new SimpleSchema({
    customerId: {
        type: String,
        label: "អតិថិជន",
        optional: true,
        autoform:{
          firstOption: 'All'
        }
    },
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
    staffId:{
        type:String,
        label:"បុគ្គលិក",
        optional: true,
        autoform:{
          firstOption: 'All'
        }
    }
});

Restaurant.Schema.OfficerChequeDetailReport = new SimpleSchema({
    customerId: {
        type: String,
        label: "អតិថិជន",
        optional: true,
        autoform:{
          firstOption: 'All'
        }
    },
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
    staffId:{
        type:String,
        label:"បុគ្គលិក",
        optional: true,
        autoform:{
          firstOption: 'All'
        }
    }
});
