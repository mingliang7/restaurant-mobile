Restaurant.Schema.ProductDetails = new SimpleSchema({
    categoryId: {
        type: String,
        optional: true,
        label:"ផ្នែក"
        /*autoform: {
            type: 'select2',
            options: function() {
                return Restaurant.List.category();
            }
        }*/
    }
});