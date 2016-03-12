Template.restaurantEditVipcard.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("vipcards", {
      _id: Router.current().params.id
    });
  })
}
Template.restaurantEditVipcard.rendered = function() {
  $('[name="tmpExpiredDate"]').datetimepicker();
  document.onkeypress = stopRKey;
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show();
      } else {
        IonLoading.hide();
      }
    })
  } catch (e) {

  }
}
Template.restaurantEditVipcard.helpers({
  vipcard() {
    var id = Router.current().params.id;
    return Restaurant.Collection.Vipcards.findOne(id);
  },
  getDate(expiredDate){
    return moment(expiredDate).format('YYYY/MM/DD');
  }
});
Template.restaurantEditVipcard.events({
  "change [name='tmpExpiredDate']": function(e){
    $('[name="expiredDate"]').val(moment($(e.currentTarget).val()).format('YYYY-MM-DD'));
  },
  "click [name='tmpExpiredDate']": function(e){
    $(e.currentTarget).select();
  },
  "keyup [name='name']"(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $('[name="value"]').focus();
    }
  }
});
AutoForm.hooks({
  editVipcard: {
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានជោគជ័យ', 'success', 'growl-bottom-right');
      Router.go('/restaurant/vipcards')
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
