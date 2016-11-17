Template._data_tabs.onRendered(()=>{
  Session.set('currentTab', 'home');
});
Template._data_tabs.events({
  'click .sign-out' () {
    Meteor.logout();
    Session.set('chart', undefined);
  },
  'click .fastSell'(event,instance){
    Meteor.call('insertSale',undefined, moment().toDate(), (err, result) => {
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
