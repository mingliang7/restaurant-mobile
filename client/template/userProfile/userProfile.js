Template.restaurantUserProfiles.created = function(){
  this.autorun(()=>{
    this.subscribe = Meteor.subscribe("activeUsers");
  })
}
Template.restaurantUserProfiles.rendered = function(){
  try {
    this.autorun(()=>{
      if(!this.subscription.ready()){
        IonLoading.show()
      }else{
        IonLoading.hide()
      }
    })
  } catch (e) {

  }
}
Template.restaurantUserProfiles.helpers({
  users(){
    return Meteor.users.find({'profile.status': 'active'});
  },
  activeLabel() {
    if (this.profile.status == 'active') {
      return '<i class="ion-checkmark-circled positive"></i> Active';
    } else {
      return '<i class="ion-minus-circled assertive"></i> Inactive';
    }
  }
})
