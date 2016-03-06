Template.restaurantUserProfiles.created = function() {
  this.autorun(() => {
    this.subscribe = Meteor.subscribe("activeUsers");
  })
}
Template.restaurantUserProfiles.rendered = function() {
  try {
    this.autorun(() => {
      if (!this.subscription.ready()) {
        IonLoading.show()
      } else {
        IonLoading.hide()
      }
    })
  } catch (e) {

  }
}
Template.restaurantUserProfiles.helpers({
  users() {
    let selector = {}
    selector['profile.status'] = 'active';
    if (!Roles.userIsInRole(Meteor.userId(), ['super'])) {
      selector.roles = {
        $nin: ['super']
      }
    }
    return Meteor.users.find(selector, {
      sort: {
        createdAt: 1
      }
    });
  },
  activeLabel() {
    if (this.profile.status == 'active') {
      return '<i class="ion-checkmark-circled positive"></i> Active';
    } else {
      return '<i class="ion-minus-circled assertive"></i> Inactive';
    }
  }
})

Template.restaurantUserProfiles.events({
  'click .approved-toggle' (e) {
    debugger
    Meteor.call('approvedUser', this._id, this.profile.approved, (err, result) => {
      if (err) {
        console.log(err)
      }
      if (result) {
        Bert.alert('ផ្តល់សិទ្ធបានជោគជ័យ!', 'success', 'growl-bottom-right')
      }
    });
  }
})
