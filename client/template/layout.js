Template.layout.helpers({
  approved(currentUser){
    debugger
  }
});

Template.layout.events({
  'click .sign-out' () {
    IonPopup.show({
      title: 'បញ្ជាក់',
      template: 'តើអ្នកពិតជាចង់ចាកចេញមែនឬទេ?',
      buttons: [{
        text: 'OK',
        type: 'button-positive',
        onTap: function() {
          Meteor.logout();
          Bert.alert('ចាកចេញបានជោគជ័យ!', 'success', 'fixed-top')
          IonPopup.close();
        }
      },{
        text: 'Cancel',
        type: 'button-stable',
        onTap: function() {
          IonPopup.close();
        }
      }]
    });
    // Meteor.logout();
    // Bert.alert('ចាកចេញបានជោគជ័យ!', 'success', 'fixed-top')
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
    Router.go('/restaurant/selectTable');
  },
  'click .activeSaleList'(){
    Router.go('/restaurant/payment');
  },
  'click .report'(){
    Router.go('restaurant.report');
  }
});
