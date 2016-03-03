Template.editStaff.helpers({
  staff(){
    let template = Template.instance();
    return Restaurant.Collection.Staffs.findOne(template.data.id);
  }
});


AutoForm.hooks({
  editStaff:{
    onSuccess(formType, result){
      Bert.alert('កែប្រែបានជោគជ័យ!', 'success', 'growl-top-right', 'fa-check');
      IonModal.close();
    },
    onError(formType, err){
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
