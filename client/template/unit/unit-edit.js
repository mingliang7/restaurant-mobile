Template.editUnit.helpers({
  unit() {
    var template = Template.instance();
    return Restaurant.Collection.Units.findOne({
      _id: template.data.id
    });
  }
});

AutoForm.hooks({
  unitEdit: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានជោគជ័យ', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
