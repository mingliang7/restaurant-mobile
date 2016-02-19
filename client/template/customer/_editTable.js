Template.editCustomer.helpers({
  customer(){
    let template = Template.instance();
    return Restaurant.Collection.Customers.findOne(template.data.id);
  }
});


AutoForm.hooks({
  editCustomer:{
    onSuccess(formType, result){
      Bert.alert('Updated!', 'success', 'growl-top-right', 'fa-check');
      IonModal.close();
    },
    onError(formType, err){
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
