Template.editTableLocation.helpers({
  tableLocation() {
    var template = Template.instance();
    return Restaurant.Collection.TableLocations.findOne({
      _id: template.data.id
    });
  }
});

AutoForm.hooks({
  editTableLocation: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែជោគជ័យ', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
