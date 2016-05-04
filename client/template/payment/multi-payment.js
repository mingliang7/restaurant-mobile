Template.restaurantMultiInvoice.events({
  'change [name="selectLocation"]'(e){
    Session.set('tableId', '');
    Session.set('tableByLocation', '');
    if(e.currentTarget.value !== ''){
      Session.set('tableByLocation', e.currentTarget.value);
    }
  },
  'change [name="selectTable"]'(e){
    if(e.currentTarget.value !== ''){
      Session.set('tableId', e.currentTarget.value);
    }
  },

})

Template.restaurantMultiInvoice.helpers({
  tableByLocation(){
    return ReactiveMethod.call('getTablesByLocation', Session.get('tableByLocation'));
  },
  invoices(tableId){
    console.log(tableId)
      return ReactiveMethod.call('getInvoicesByTable', Session.get('tableId'))
  }
})

Template.restaurantMultiInvoice.onDestroyed(function(){
  Session.set('tableId', '');
  Session.set('tableByLocation', '');
});
