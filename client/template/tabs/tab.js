Template._data_tabs.onRendered(()=>{
  Session.set('currentTab', 'home');
});
Template._data_tabs.events({
  'click .sign-out' () {
    Meteor.logout();
    Session.set('chart', undefined);
  },
});
