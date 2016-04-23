Template.editMaterial.helpers({
  material(){
    let template = Template.instance();
    return Restaurant.Collection.Materials.findOne(`${template.data.id}`);
  }
});


AutoForm.hooks({
  editMaterial:{
    onSuccess(formType, result){
      alertify.success('កែប្រែបានជោគជ័យ!');
      IonModal.close();
    },
    onError(formType, err){
      alertify.error(err.message);
    }
  }
});
