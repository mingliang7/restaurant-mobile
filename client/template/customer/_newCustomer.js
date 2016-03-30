Template.newCustomer.rendered = function(){
  Session.set('customerType', undefined);
};
Template.newCustomer.helpers({
  isOfficer(){
    if(Session.get('customerType')){
      return true;
    }
    return false;
  }
});

Template.newCustomer.events({
  "change [name='type']": function(event){
    if(event.currentTarget.value == 'officer'){
      Session.set('customerType', true);
    }else{
      Session.set('customerType', undefined);
    }
  }
});
AutoForm.hooks({
  newCustomer: {
    onSuccess(formType, result) {
      Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-top-right', 'fa-check');
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
