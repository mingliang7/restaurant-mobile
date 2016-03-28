Template.restaurantSaleDetailProductReport.onRendered(function() {
  $('[name="fromDate"]').datetimepicker();
  $('[name="toDate"]').datetimepicker();
});
Template.restaurantSaleDetailProductReport.helpers({
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
    }];
  },
  users() {
    return ReactiveMethod.call('getUserList');
  }
});

Template.restaurantSaleDetailProductReportGen.helpers({
  data: function() {
    var query = Router.current().params.query;
    var params = "saleReportWithProduct";
    Fetcher.setDefault(params, false);
    Fetcher.retrieve(params, 'getSaleReportWithProduct', query);
    return Fetcher.get(params);
  },
  convertToDollar(amount){
    let exchange = Restaurant.Collection.ExchangeRates.findOne({}, {sort: {created: -1}});
    return numeral(amount / exchange.rates[0].rate).format('0,0.00');
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
