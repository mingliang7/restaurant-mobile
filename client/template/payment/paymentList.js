Template.restaurantPaymentList.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("paymentList", Router.current().params.saleId);
  });
}

Template.restaurantPaymentList.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    });
  } catch (e) {

  }
}
Template.restaurantPaymentList.helpers({
  payments() {
    return Restaurant.Collection.Payments.find({
      saleId: Router.current().params.saleId
    });
  },
  backToSale(){
    return `/restaurant/payment/${Router.current().params.saleId}/show`;
  }
});
