Template.layout.helpers({
  approved(currentUser){
    debugger
  }
});

Template.layout.events({
  'click .sign-out' () {
    Meteor.logout();
    Bert.alert('ចាកចេញបានជោគជ័យ!', 'success', 'fixed-top')
  },
  'click .home' () {
    Router.go('home');
  },
  'click .data' () {
    Router.go('restaurant.data');
  },
  'click .setting' () {
    Router.go('restaurant.setting')
  },
  'click .sale'(){
    Router.go('/restaurant/sale');
  },
  'click .activeSaleList'(){
    Router.go('/restaurant/payment');
  },
  'click .report'(){
    Router.go('restaurant.report');
  }
});
