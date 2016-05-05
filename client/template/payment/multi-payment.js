Template.restaurantMultiInvoice.created = function(){
  Session.set('invoiceObj', {});
}

Template.restaurantMultiInvoice.events({
  'click .payment'(e){
    e.preventDefault();
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `ធ្វើការបង់ប្រាក់?`,
      onOk: () => {
        if(!_.isEmpty(Session.get('invoiceObj'))){
        IonLoading.show();
        Meteor.call('multiPayment', Session.get('invoiceObj'), function(err, result) {
          if (err) {
            console.log(err);
            IonLoading.hide();
          } else {
            IonLoading.hide();
            Bert.alert(`បង់ប្រាក់បានជោគជ័យ!`, 'growl-bottom-right', 'fa-check');
            Router.go('/restaurant/payment')
          }
        });
      }
      }
    });
  },
  'change .check-all'(e){
    let invoiceObj = Session.get('invoiceObj');
    if($(e.currentTarget).prop('checked')){
      Meteor.call('getInvoicesByTable', Session.get('tableId'), (err,result)=>{
        if(result){
          result.forEach((invoice)=>{
            invoiceObj[invoice._id] = invoice
          });
          Session.set('invoiceObj', invoiceObj)
        }
      });
    }else{
      Session.set('invoiceObj', {})
    }
  },
  'change .invoice'(e){
    let invoiceObj = Session.get('invoiceObj');
    let currentVal = $(e.currentTarget).prop('checked');
    if(currentVal){
      invoiceObj[this._id] = this;
      Session.set('invoiceObj', invoiceObj);
    }else{
      delete invoiceObj[this._id];
      Session.set('invoiceObj', invoiceObj);
    }
  },
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
      let invoice = ReactiveMethod.call('getInvoicesByTable', Session.get('tableId'))
      Session.set('invoiceLength', invoice.length);
      return invoice;
  },
  markAsChecked(invoiceId){
    let invoiceObj = Session.get('invoiceObj');
    if(!_.isEmpty(invoiceObj)){
        for(let k in invoiceObj){
          if(k == invoiceId){
            return true;
          }
        }
    }
    return false;
  },
  isInvoiceObjEmpty(){
    let invoiceLength = Session.get('invoiceLength') || 0;
    console.log(invoiceLength)
    if(Object.keys(Session.get('invoiceObj')).length == 0){
      $('.check-all').prop('checked', false)
    }
    if(Object.keys(Session.get('invoiceObj')).length == invoiceLength){
        $('.check-all').prop('checked', true);
    }
  },
  invoiceNotZero(invoices) {
    if(invoices.length > 0){
      return true;
    }
    return false;
  }

})

Template.restaurantMultiInvoice.onDestroyed(function(){
  Session.set('tableId', '');
  Session.set('tableByLocation', '');
  Session.set('invoiceLength', undefined)
  Session.set('invoiceObj', {})
});
