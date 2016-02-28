Deps.autorun(function() {
  if (Session.get('querySaleForMerge')) {
    Meteor.subscribe('searchSaleForMerge', Session.get('querySaleForMerge'), Session.get('paramsInvoiceId'));
  }
});

Template.searchSaleForMerge.events({
  'keyup input': function(event, template) {
    Session.set('querySaleForMerge', event.target.value);
  },

  'click a': function(event, template) {
    IonModal.close();
  },
  'click .saleDetailItem'(e){
    let selectedSaleId = this.data;
    let params = Router.current().params;
    let currentSaleId = params.invoiceId;
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `ពិតជាចង់បញ្ចូលជាមួយវិក័យប័ត្រ ${selectedSaleId}?`,
      onOk: () => {
        IonModal.close();
        IonLoading.show();
        Meteor.call('mergeSaleInvoice', currentSaleId, selectedSaleId, (err,result)=>{
          if(err){
            Bert.alert(err.message, 'danger')
          }else{
            IonLoading.hide();
            Bert.alert('បញ្ចូលវិក័យប័ត្របានជោគជ័យ', 'success', 'growl-bottom-right')
            Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${selectedSaleId}`);
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  }
});

Template.searchSaleForMerge.helpers({
  sales: function() {
    let sale = Restaurant.Collection.Sales.search(Session.get('querySaleForMerge'), Router.current().params.invoiceId);
    return sale
  },
  searchQuery: function() {
    return Session.get('querySaleForMerge');
  }
});
