Restaurant.Schema.MultiPayment = new SimpleSchema({
  selectLocation:{
    type: String,
    label: 'ជ្រើសរើសទីតាំង',
    autoform:{
      type: 'select',
      options(){
        return Restaurant.List.tableLocations()
      }
    }
  },
  selectTable: {
      type: String,
      label: 'ជ្រើសរើសតុ',
      autoform: {
        type: 'select'
      }
  }
});
