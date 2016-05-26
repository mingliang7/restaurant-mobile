/**
 * Schema
 */
Restaurant.Schema.SummaryReport = new SimpleSchema({
    fromDate: {
        type: String,
        label: "កាលបរិច្ឆេទចាប់ផ្ដើម",
        optional:true
    },
    toDate: {
        type: String,
        label: "កាលបរិច្ឆេទបញ្ចប់",
        optional:true

    },
    staff: {
        type: String,
        label: "ប្រភេទអតិថិជន",
        autoform:{
          type: 'select',
          options(){
            return [{label: 'General', value: 'normal'}, {label: 'Officer', value: 'officer'}]
          }
        }
    }
});
