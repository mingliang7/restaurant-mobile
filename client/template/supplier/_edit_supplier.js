Template.editSupplier.helpers({
  supplier() {
    let template = Template.instance();
    let supplier = Restaurant.Collection.Suppliers.findOne(template.data.id);
    if (supplier.type == 'officer') {
      Session.set('supplierType', true);
    }
    return supplier;
  },
  isOfficer() {
    if (Session.get('supplierType')) {
      return true;
    }
    return false;
  }
});
Template.editSupplier.events({
  "change [name='type']": function(event) {
    if (event.currentTarget.value == 'officer') {
      Session.set('supplierType', true);
    } else {
      Session.set('supplierType', undefined);
    }
  }
});

AutoForm.hooks({
  editSupplier: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានជោគជ័យ!', 'success', 'growl-top-right', 'fa-check');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
