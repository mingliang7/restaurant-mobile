Template.editCategory.helpers({
  category() {
    var template = Template.instance();
    return Restaurant.Collection.Categories.findOne({
      _id: template.data.id
    });
  }
});

AutoForm.hooks({
  editCategory: {
    onSuccess(formType, result) {
      Bert.alert('Updated', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
