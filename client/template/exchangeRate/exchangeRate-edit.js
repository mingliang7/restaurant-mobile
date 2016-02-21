Template.editExchangeRate.helpers({
  unit() {
    var template = Template.instance();
    return Restaurant.Collection.ExchangeRates.findOne({
      _id: template.data.id
    });
  }
});

AutoForm.hooks({
  editExchangeRate: {
    onSuccess(formType, result) {
      Bert.alert('Updated', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
