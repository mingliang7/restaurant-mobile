Template.restaurantStockEnabled.created = function() {
  this.autorun(function() {
    this.subscription = Meteor.subscribe('stockEnabled');
  }.bind(this));
};
Template.restaurantStockEnabled.rendered = function() {
  this.autorun(function() {
    if (!this.subscription.ready()) {
      IonLoading.show();
    } else {
      IonLoading.hide();
    }
  }.bind(this));
};

Template.restaurantStockEnabled.helpers({
  stockEnabled() {
    console.log(Restaurant.Collection.StockEnabled.find().fetch());
    return Restaurant.Collection.StockEnabled.find({});
  },
  checkEnable(val){
    return val ? '<span class="balanced">បានដាក់អោយប្រើប្រាស់</span>' : '<span class="assertive">មិនទានបានដាក់អោយប្រើប្រាស់</span>';
  }
});
