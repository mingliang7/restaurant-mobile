Template.restaurantNewEop.rendered = function(){
  $('[name="tmpStartEopDate"]').datetimepicker();
  $('[name="tmpEndEopDate"]').datetimepicker();
};


Template.restaurantNewEop.events({
  'change [name="tmpStartEopDate"]'(e){
    $('[name="startEopDate"]').val(moment(e.currentTarget.value).format('YYYY-MM-DD HH:mm:ss'));
  }
});
