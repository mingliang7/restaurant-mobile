Template.restaurantSummaryReport.onRendered(function() {
  $('[name="fromDate"]').datetimepicker();
  $('[name="toDate"]').datetimepicker();
});
Template.restaurantSummaryReport.helpers({
  // customers() {
  //   return ReactiveMethod.call('getCustomerList');
  // },
  // status() {
  //   return [{
  //     value: "active",
  //     label: "មិនទាន់បានកាត់ស្តុុក"
  //   }, {
  //     value: "closed",
  //     label: "បានកាត់ស្តុករួចរាល់"
  //   }
  //   , {
  //     value: "partial",
  //     label: "ជំពាក់"
  //   }, {
  //     value: "canceled",
  //     label: "បោះបង់"
  //   }
  // ]
  // },
  users() {
    return ReactiveMethod.call('getUserList');
  }
});

Template.restaurantSummaryReportGen.helpers({
  data: function() {
    var query = Router.current().params.query;
    var params = "saleReport";
    Fetcher.setDefault(params, false);
    Fetcher.retrieve(params, 'getSummaryReport', query);
    return Fetcher.get(params);
  },
  str(_id) {
    let status = '';
    switch (_id) {
      case 'closed':
        status = 'បានបង់ប្រាក់';
        break;
      case 'active':
        status = 'កំពុងលក់';
        break;
      case 'partial':
        status = 'ជំពាក់';
        break;
    }
    return `<b>${status}</b>`
  },
  getBaseCurrency(total) {
    try {
      let exchange = Restaurant.Collection.ExchangeRates.findOne({}, {
        sort: {
          _id: -1
        }
      });
      return `${numeral(total).format('0,0.00')}${exchange.symbol}`
    } catch (e) {

    }
  },
  statusPartial(_id ){
    return _id == 'partial';
  },
  statusClosed(_id){
    return _id == 'closed';
  },
  statusActive(_id){
    return _id == 'active';
  },
  exchangeCurrency(value){
    let exchange = Restaurant.Collection.ExchangeRates.findOne({}, {sort: {_id: 1}})
    if(exchange.base == 'KHR'){
      return numeral(value / exchange.rates[0].rate).format('0,0.00') + '$';
    }
    return numeral(value * exchange.rates[0].rate).format('0,0') + 'R';
  }
});

AutoForm.hooks({
  restaurantSaleReport: {}
});
