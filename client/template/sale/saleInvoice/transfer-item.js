Deps.autorun(function() {
  if (Session.get('querySaleForTransfer')) {
    Meteor.subscribe('searchSaleForMerge', Session.get('querySaleForTransfer'), Session.get('paramsInvoiceId'));
  }
});

Template.transferItem.events({
  'keyup input': function(event, template) {
    Session.set('querySaleForTransfer', event.target.value);
  },

  'click a': function(event, template) {
    IonModal.close();
  },
  'click .saleDetailItem' (e) {
    let selectedSaleId = this.data;
    let params = Router.current().params;
    let currentSaleId = params.invoiceId;
    let detachObj = Session.get('detachSaleDetailObj');
    IonPopup.confirm({
      title: 'បញ្ជាក់',
      template: `ពិតជាចង់ផ្ទេរទំនិញជាមួយវិក័យប័ត្រ ${selectedSaleId}?`,
      onOk: () => {
        IonLoading.show();
        Meteor.call('transferItem', selectedSaleId, currentSaleId, detachObj, (err, result) => {
          if (err) {
            Bert.alert('ផ្ទេរមិនបានជោគជ័យ', 'danger', 'growl-bottom-right', 'fa-info')
            IonLoading.hide();
          } else {
            IonLoading.hide();
            let params = Router.current().params;
            Bert.alert(`ផ្ទេរទំនិញបានជោគជ័យ!`, 'success', 'growl-bottom-right', 'fa-check')
            Session.set('detachSaleDetailObj', {});
            Router.go(`/restaurant/sale/${params.tableLocationId}/table/${params.tableId}/saleInvoice/${result}`)
          }
        });
      },
      onCancel: function() {
        Bert.alert('Cancelled', 'info', 'growl-bottom-right', 'fa-info')
      }
    });
  }
});

Template.transferItem.helpers({
  sales: function() {
    let sale = Restaurant.Collection.Sales.search(Session.get('querySaleForTransfer'), Router.current().params.invoiceId);
    return sale
  },
  searchQuery: function() {
    return Session.get('querySaleForTransfer');
  }
});
