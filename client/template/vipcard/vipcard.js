Template.restaurantVipcard.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("vipcards");
  })
}


Template.restaurantVipcard.rendered = function() {
  this.autorun(() => {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  })
}

Template.restaurantVipcard.helpers({
  vipcards() {
    return Restaurant.Collection.Vipcards.find({}, {
      sort: {
        _id: -1
      }
    })
  },
  vipcardsNotZero(){
    let count = Restaurant.Collection.Vipcards.find({}).count();
    if(count > 0) {
      return true;
    }
    return false;
  }
});
