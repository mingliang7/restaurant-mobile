/**
 * Schema
 */
Restaurant.Schema.SaleDetailReport = new SimpleSchema({
    categoryId: {
        type: String,
        label: "ផ្នែក",
      /*  autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.category("All");
            }
        },*/
        optional:true
    },
    customerId:{
        type:String,
        label:"អតិថិជន",
     /*   autoform: {
            type: "select2",
            options:function(){
                return Restaurant.List.customer();
            }
        },*/
        optional:true

    },
    fromDate: {
        type: String,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម"
    },
    toDate:{
        type:String,
        label:"កាលបរិច្ឆេទបញ្ចប់"
    },
    staffId:{
        type:Date,
        label:"បុគ្កលិក",
        /*autoform: {
            type: "select2",
            options:function(){
                return Restaurant.List.staff();
            }
        },*/
        optional:true
    }
});
