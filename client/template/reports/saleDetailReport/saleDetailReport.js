Template.restaurantSaleDetailReport.onRendered(function() {
  $('[name="fromDate"]').datetimepicker();
  $('[name="toDate"]').datetimepicker();
});

Template.restaurantSaleDetailReport.helpers({
  customers() {
    return ReactiveMethod.call('getCustomerList');
  },
  categories() {
    return ReactiveMethod.call('getCategoryList')
  }
});

Template.restaurantSaleDetailReportGen.helpers({
  getNumberOfRow: function(transaction) {
    return transaction.length;
  },
  options: function() {
    // font size = null (default), bg
    // paper = a4, a5, mini
    // orientation = portrait, landscape
    return {
      //fontSize: 'bg',
      paper: 'a4',
      orientation: 'portrait'
    };
  },
  data: function() {
    // Get query params
    //FlowRouter.watchPathChange();
    var query = Router.current().params.query;
    var params = "saleDetailReport";
    Fetcher.setDefault(params, false);
    Fetcher.retrieve(params, 'getSaleDetailReport', query);
    return Fetcher.get(params);
  }

});


AutoForm.hooks({
  restaurantSaleDetailReport: {
    onSubmit(doc) {
      this.event.preventDefault();
      let status = '';
      if (doc.status) {
        doc.status = doc.status.join(',');
        status = doc.status;
      }
      let fromDate = moment($('[name="fromDate"]').val()).format('YYYY-MM-DD HH:mm:ss');
      let toDate =  moment($('[name="toDate"]').val()).format('YYYY-MM-DD HH:mm:ss');
      let customerId = doc.customerId === undefined ? '' : doc.customerId;
      let categoryId = doc.categoryId === undefined ? '' : doc.categoryId ;
      let url = `/restaurant/sale-detail-report-gen?fromDate=${fromDate}&toDate=${toDate}&customerId=${customerId}&categoryId=${categoryId}&status=${status}`;
      this.done(); //reset form
      window.open(url, '_blank');

    },
    onSuccess(formType, result){

    }
  }
});
