AutoForm.hooks({
  newMaterial: {
    onSuccess(formType, result) {
      alertify.success('បង្កើតបានជោគជ័យ');
    },
    onError(formType, err) {
      alertify.error(err.message);
    }
  }
})