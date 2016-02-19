AutoForm.hooks({
  newCustomer: {
    onSuccess(formType, result) {
      Bert.alert('Success', 'success', 'growl-top-right', 'fa-check');
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
