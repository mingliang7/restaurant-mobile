Template.exchangeRate.created = function () {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('exchangeRates');
    }.bind(this));
};
Template.exchangeRate.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.exchangeRate.helpers({
    exchangeRates(){
        return Restaurant.Collection.ExchangeRates.find()
    }
});

Template.exchangeRate.events({
  'click [data-action="confirm"]'(event, template) {
       IonPopup.confirm({
           title: 'Are you sure?',
           template: `Detele ${this.name}?`,
           onOk: () => {
               Meteor.call('removeExchangeRate', this._id);
           },
           onCancel: function () {
               console.log('Cancelled');
           }
       });
   }
});
