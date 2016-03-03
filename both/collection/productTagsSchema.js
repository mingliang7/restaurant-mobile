Restaurant.Schema.CategoryTags = new SimpleSchema({
  tags: {
    type: [String],
    autoform: {
      type: 'select-checkbox'
    }
  },
  units:{
    type: [String],
    autoform: {
      type: 'select-checkbox'
    }
  }
});
