Meteor.startup(function() {
  Restaurant.Collection.Sales._ensureIndex({
    total: 1
  });
  Meteor.defer(function() {
    let emptySales = Restaurant.Collection.Sales.find({
      total: {
        $exists: false
      }
    }, {
      multi: true
    });
    if (emptySales.count != 0) {
      emptySales.forEach((emptySale) => {
        Restaurant.Collection.Sales.direct.remove(emptySale._id);
      });
    }
  })
})
