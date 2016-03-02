/**
 * Schema
 */
Restaurant.Schema.SaleReport = new SimpleSchema({
    customerId: {
        type: String,
        label: "អតិថិជន",
        /*autoform: {
            type: "select2",
            options: function () {
                return Restaurant.List.customer();
            }
        },*/
        optional: true

    },
    date: {
        type: String,
        label: "កាលបរិច្ឆេក"
    },

    status: {
        type: String,
        label: "Status",
        autoform: {
            type: "select2",
            options: function () {
                return [
                    {value: '', label: 'All'},
                    {value: 'Owed', label: 'Owed'},
                    {value: 'Paid', label: 'Paid'}
                ]
            }
        },
        optional:true
    }
});