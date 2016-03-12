Template.restaurantNewVipcard.rendered = function(){
  $('[name="tmpExpiredDate"]').datetimepicker();
  document.onkeypress = stopRKey;
}
Template.restaurantNewVipcard.events({
  "change [name='tmpExpiredDate']": function(e){
    $('[name="expiredDate"]').val(moment($(e.currentTarget).val()).format('YYYY-MM-DD'));
  },
  "click [name='tmpExpiredDate']": function(e){
    $('[name="expiredDate"]').val(moment($(e.currentTarget).val()).format('YYYY-MM-DD'));
  },
  "keyup [name='name']"(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $('[name="value"]').focus();
    }
  }
});
AutoForm.hooks({
  newVipcard: {
    onSuccess(formType, res) {
      Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-bottom-right')
        //IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});


function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}
