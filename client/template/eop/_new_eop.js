Template.restaurantNewEop.rendered = function() {
  $('[name="tmpEndEopDate"]').datetimepicker();
};


Template.restaurantNewEop.events({
  'change [name="tmpStartEopDate"]' (e) {
    $('[name="startEopDate"]').val(moment(e.currentTarget.value).format('YYYY-MM-DD'));
  },
  'change [name="tmpEndEopDate"]' (e) {
    Meteor.call('findLastDate',(err,result)=>{
      if(err){
        console.log(err);
      }else{
        let currentEndDate = moment(e.currentTarget.value).format('YYYY-MM-DD');
        if(currentEndDate >= result){
          $('[name="endEopDate"]').val(currentEndDate);
        }else{
          alertify.error(`ថ្ងៃបញ្ចប់នៃការបិទបញ្ចីត្រូវធំជាងឬស្មើ ${result}`);
          $('[name="tmpEndEopDate"]').val('');
        }
      }
    });
  },
  'click .save'(){
    IonLoading.show();
  }
});
Template.restaurantNewEop.helpers({
  tmpStartEopDate(){
    return  ReactiveMethod.call('findLastDate');
  }
});

AutoForm.hooks({
  newEop: {
    onSuccess(formType, result) {
      IonLoading.hide();
      alertify.success('បិទបញ្ជីបានជោគជ័យ!');
    },
    onError(formType, err) {
      IonLoading.hide();
      alertify.error(err.message);
    }
  }
});
