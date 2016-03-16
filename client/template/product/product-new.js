Template.productNew.rendered = function(){
  Session.set('stockValue', false);
}

Template.productNew.events({
  "click [name='stockType']": function(event, template){
    let currentVal = event.currentTarget.value;
    if(currentVal == 'Stock'){
      Session.set('stockValue', false);
    }else{
      Session.set('stockValue', true)
    }
  },
  "click .ingradientName"(event, template){
    IonModal.open('materialProduct');
  }
});
Template.productNew.helpers({
  isNotStockValue(){
    return Session.get('stockValue');
  },
  tmpItems(){
    return TmpItem.find();
  }
});
AutoForm.hooks({
   productNew:{
       onSuccess(formType, res){
           Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-bottom-right')
           //IonModal.close();
       },
       onError(formType, err){
           Bert.alert( err.message, 'danger', 'growl-bottom-right' );
       }
   }
});
