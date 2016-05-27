Template.restaurantSaleReport.onRendered(function() {
  $('[name="fromDate"]').datetimepicker();
  $('[name="toDate"]').datetimepicker();
});
Template.restaurantSaleReport.helpers({
  customers() {
    return ReactiveMethod.call('getCustomerList');
  },
  status() {
    return [{
      value: "active",
      label: "កំពុងលក់"
    }, {
      value: "closed",
      label: "ទូរទាត់ហើយ"
    }, {
      value: "partial",
      label: "ជំពាក់"
    }, {
      value: "canceled",
      label: "បោះបង់"
    },  {
      value: "transfer",
      label: "ផ្ទេរ"
    }]
  },
  users() {
    return ReactiveMethod.call('getUserList');
  }
});

Template.restaurantSaleReportGen.helpers({
  data: function() {
    var query = Router.current().params.query;
    var params = "saleReport";
    Fetcher.setDefault(params, false);
    Fetcher.retrieve(params, 'getSaleReport', query);
    return Fetcher.get(params);
  },
  statusCanceled(status){
    if(status == 'canceled' || status == 'transfer'){
      return true;
    }
  },
  partial(status) {
      return status == 'partial'
  }
});

AutoForm.hooks({
  restaurantSaleReport: {}
});
