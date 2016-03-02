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
    date: {
        type: String,
        label: "កាលបរិច្ឆេទ"
    },

    staffId:{
        type:String,
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