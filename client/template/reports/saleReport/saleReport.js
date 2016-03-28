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
      value: 'partial',
      label: 'ជំពាក់'
    }, {
      value: "closed",
      label: "លក់ហើយ"
    },{
      value: "canceled",
      label: "បោះបង់"
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
    if(status == 'canceled'){
      return true;
    }
  }
});

AutoForm.hooks({
  restaurantSaleReport: {}
});
