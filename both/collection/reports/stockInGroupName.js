Restaurant.Schema.StockInGroupNameReport = new SimpleSchema({
  fromDate: {
    type: String,
    label: "កាលបរិច្ឆេទចាប់ផ្ដើម",
    optional: true
  },
  toDate: {
    type: String,
    label: "កាលបរិច្ឆេទបញ្ចប់",
    optional: true

  },
  type: {
    type: String,
    optional: true,
    label: 'ប្រភេទ',
    autoform: {
      firstOption: 'All',
      type: 'select',
      options() {
        return [{
          label: 'នាំចូល',
          value: 'order'
        }, {
          label: 'កែប្រែសម្រួល',
          value: 'adjustment'
        }];
      }
    }
  },
  materialCategoryId: {
    type: 'String',
    label: 'ផ្នែក',
    optional: true,
    autoform: {
      type: 'select',
      firstOption: 'All',
      options() {
        let list = [];
        let materialCategories = Restaurant.Collection.MaterialCategories.find();
        if (materialCategories.count() > 0) {
          materialCategories.forEach((materialCategory) => {
            list.push({
              label: `${materialCategory.name}`,
              value: materialCategory._id
            });
          });
        }
        return list;
      }
    }
  }
});
