Template.layout.helpers({

});

Template.layout.events({
  'click .sign-out' () {
    Meteor.logout();
    Bert.alert('Successfully logout', 'success', 'fixed-top')
  },
  'click .home' () {
    Router.go('home');
  },
  'click .data' () {
    Router.go('restaurant.data');
  },
  'click .setting' () {
    Router.go('restaurant.setting')
  }
});
