Template.editProduct.helpers({
  product() {
    var template = Template.instance();
    return Restaurant.Collection.Products.findOne({
      _id: template.data.id
    });
  }
});

AutoForm.hooks({
  productEdit: {
    onSuccess(formType, result) {
      Bert.alert('Updated', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
