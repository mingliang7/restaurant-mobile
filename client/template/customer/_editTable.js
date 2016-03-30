Template.editCustomer.helpers({
  customer() {
    let template = Template.instance();
    let customer = Restaurant.Collection.Customers.findOne(template.data.id);
    if (customer.type == 'officer') {
      Session.set('customerType', true);
    }
    return customer;
  },
  isOfficer() {
    if (Session.get('customerType')) {
      return true;
    }
    return false;
  }
});
Template.editCustomer.events({
  "change [name='type']": function(event) {
    if (event.currentTarget.value == 'officer') {
      Session.set('customerType', true);
    } else {
      Session.set('customerType', undefined);
    }
  }
});

AutoForm.hooks({
  editCustomer: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានជោគជ័យ!', 'success', 'growl-top-right', 'fa-check');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
