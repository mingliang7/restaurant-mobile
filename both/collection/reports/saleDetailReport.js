/**
 * Schema
 */
Restaurant.Schema.SaleDetailReport = new SimpleSchema({
  categoryId: {
    type: [String],
    label: "ផ្នែក",
    autoform: {
      firstOption: 'All'
    },
    optional: true
  },
  status: {
    type: [String],
    label: 'ប្រភេទវិក័យប័ត្រ',
    autoform: {
      type: 'select',
      options() {
        return [{
          label: 'កំពុងលក់',
          value: 'active'
        }, {
          label: 'ទូរទាត់រួច',
          value: 'closed'
        }, {
          label: 'ផ្អាក',
          value: 'canceled'
        }];
      }
    }
  },
  customerId: {
    type: String,
    label: "អតិថិជន",
    autoform: {
      firstOption: 'All'
    },
    optional: true

  },
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
  staffId: {
    type: String,
    label: "បុគ្កលិក",
    autoform: {
      firstOption: 'All'
    },
    optional: true
  }
});
