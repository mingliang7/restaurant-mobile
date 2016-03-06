Meteor.methods({
  getCustomerList() {
    var list = [];
    Restaurant.Collection.Customers.find().forEach(function(obj) {
      list.push({
        label: obj.name,
        value: obj._id
      });
    });
    return list;
  },
  getCategoryList() {
    var list = [];
    Restaurant.Collection.Categories.find({}, {
      sort: {
        name: 1
      }
    }).forEach(function(obj) {
      list.push({
        label: obj.name,
        value: obj._id
      });
    });
    return list;
  },
  getUserList() {
    var list = [];
    Meteor.users.find().forEach((obj) => {
      list.push({
        label: obj.profile.username,
        value: obj._id
      })
    });
    return list;
  }
});
