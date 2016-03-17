Restaurant.Schema.ProductDetailReport = new SimpleSchema({
    categoryId: {
        type: String,
        optional: true,
        label:"ផ្នែក",
        autoform: {
          firstOption: 'All'
        }
    }
});
