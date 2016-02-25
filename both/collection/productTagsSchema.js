Restaurant.Schema.CategoryTags = new SimpleSchema({
  tags: {
    type: [String],
    autoform: {
      type: 'select-checkbox'
    }
  }
});
