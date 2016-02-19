Template.editNote.helpers({
  note(){
    let template = Template.instance();
    return Restaurant.Collection.Notes.findOne(template.data.id);
  }
});


AutoForm.hooks({
  editNote:{
    onSuccess(formType, result){
      Bert.alert('Updated!', 'success', 'growl-top-right', 'fa-check');
      IonModal.close();
    },
    onError(formType, err){
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
