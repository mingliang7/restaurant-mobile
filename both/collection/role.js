Restaurant.Schema.Roles = new SimpleSchema({
  _id: {
    type: String
  },
  roles: {
    type: [String],
    autoform: {
      type: 'select-checkbox',
      options(){
        return Restaurant.List.roles();
      }
    }
  }
})
