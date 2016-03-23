Template.restaurantNewEop.rendered = function() {
  $('[name="tmpStartEopDate"]').datetimepicker({
    'showTimepicker': false
  });
  $('[name="tmpEndEopDate"]').datetimepicker();
};


Template.restaurantNewEop.events({
  'change [name="tmpStartEopDate"]' (e) {
    $('[name="startEopDate"]').val(moment(e.currentTarget.value).format('YYYY-MM-DD'));
  },
  'change [name="tmpEndEopDate"]' (e) {
    $('[name="endEopDate"]').val(moment(e.currentTarget.value).format('YYYY-MM-DD'));
  }
});

AutoForm.hooks({
  newEop: {
    onSuccess(formType, result) {},
    onError(formType, err) {
      alertify.error(err.message);
    }
  }
});
