Restaurant.Schema.OutstandingReport = new SimpleSchema({
    customerId:{
        type:String,
        label:"អតិថិជន",
        /*autoform: {
            type: "select2",
            options:function(){
                return Restaurant.List.customer();
            }
        },*/
        optional:true

    },
    date: {
        type: Date,
        label: "កាលបរិច្ឆេទ"
    }

});