Template._data_tabs.onRendered(()=>{
  Session.set('currentTab', 'home');
});
Template._data_tabs.events({
  'click .sign-out' () {
    Meteor.logout();
    Bert.alert('ចាកចេញបានជោគជ័យ!', 'success', 'fixed-top')
  },
  'click .fastSell'(event,instance){
    Meteor.call('insertSale', (err, result) => {
      if (err) {
        Bert.alert(err.message, 'danger', 'growl-bottom-right');
        IonLoading.hide();
      } else {
        IonLoading.hide();
        Session.set('invoiceId', result.sid);
        Router.go(`/restaurant/sale/${result.tableLocationId}/table/${result.tableId}/saleInvoice/${result.sid}`);
        //  Router.go(`/restaurant/saleList/location/${tableLocationId}/table/${tableId}/checkout/${result}`);
      }
    });
  }
});
