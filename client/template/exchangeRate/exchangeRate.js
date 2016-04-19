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
  'click .remove-exchangeRates' (event, template) {
    let base = this.base;
    IonPopup.confirm({
      title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
      template: `លុប ${base} ?`,
      onOk: () => {
        Meteor.call('removeExchangeRate', this._id, function(err, result) {
          if (err) {
            Bert.alert(`Can't Removed ${base}`,'danger','growl-bottom-right','fa-remove')
          } else {
            Bert.alert(`លុប ${base}​ បានជោគជ័យ !`,'success','growl-bottom-right','fa-check')
          }
        });
      },
      onCancel: function() {
        Bert.alert('មិនយល់ព្រមក្នុងការលុប !','info','growl-bottom-right','fa-info')
      }
    });
  }
});
