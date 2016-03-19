Template.newStockIn.events({
  "click [name='productId']": function(event, template){
    
  }
});
AutoForm.hooks({
  newStockIn: {
    onSuccess(formType, result) {
      Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-top-right', 'fa-check');
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
