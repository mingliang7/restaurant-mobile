Meteor.methods({
  getPaymentReport: function(arg) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };

    var params = {};
    var fromDate = moment(arg.fromDate, "YYYY/MM/DD HH:mm").toDate();
    var toDate = moment(arg.toDate, "YYYY/MM/DD HH:mm").toDate();
    var customerId = arg.customerId;

    data.title = Restaurant.Collection.Company.findOne();
    var customer = "ទាំងអស់",
      status = "ទាំងអស់",
      staff = "ទាំងអស់";
    params.$or = [{
      '_customer.type': 'normal'
    }, {
      '_customer.type': {
        $exists: false
      }
    }];
    if (fromDate != null && toDate != null) params.paymentDate = {
      $gte: fromDate,
      $lte: toDate
    };
    if (customerId != null && customerId != "") {
      params.customerId = customerId;
      customer = Restaurant.Collection.Customers.findOne(customerId).name;
    }
    if (arg.status != null && arg.status) {
      status = arg.status;
      params.status = arg.status;
    }
    if (arg.staffId != "" && arg.staffId != null) {
      staff = Meteor.users.findOne(arg.staffId).profile.username;
      params.staffId = arg.staffId;
    }

    var sale = Restaurant.Collection.Payments.find(params);
    var header = {};
    header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    header.customer = customer;
    header.status = status;
    header.staff = staff;

    /****** Header *****/
    data.header = header;
    var content = calculateSaleHelper(sale);
    data.grandTotalDueAmount = content.grandTotalDueAmount;
    data.grandTotalPaidAmount = content.grandTotalPaidAmount;
    data.grandTotalBalanceAmount = content.grandTotalBalanceAmount;

    data.grandTotalDueAmountKhr = content.grandTotalDueAmountKhr;
    data.grandTotalPaidAmountKhr = content.grandTotalPaidAmountKhr;
    data.grandTotalBalanceAmountKhr = content.grandTotalBalanceAmountKhr;

    //return reportHelper;
    /****** Content *****/
    if (content.length > 0) {
      data.content = content;
    }
    return data;

  }
});

function calculateSaleHelper(sl) {
  var grandTotalDueAmount = 0;
  var grandTotalPaidAmount = 0;
  var grandTotalBalanceAmount = 0;

  var grandTotalDueAmountKhr = 0;
  var grandTotalPaidAmountKhr = 0;
  var grandTotalBalanceAmountKhr = 0;

  var exchange = Restaurant.Collection.ExchangeRates.findOne({},{sort:{_id:-1}});
  var subTotal = 0;
  var grandTotalConvert = {};
  var saleList = [];
  var i = 1;
  sl.forEach(function(s) {
    grandTotalDueAmount += s.dueAmount;
    grandTotalPaidAmount += s.truelyPaid;

    s.order = i;
    s.customer = Restaurant.Collection.Customers.findOne({_id:s.customerId}).name;
    s.paymentDate = moment(s.paymentDate).format("DD-MM-YY, HH:mm:ss");
    s.balanceAmount = s.dueAmount - s.truelyPaid;
    grandTotalBalanceAmount += s.balanceAmount;

    i++;
    saleList.push(s);
  });
  saleList.grandTotalDueAmount = numeral(grandTotalDueAmount).format('0,0.00 $');
  saleList.grandTotalPaidAmount = numeral(grandTotalPaidAmount).format('0,0.00 $');
  saleList.grandTotalBalanceAmount = numeral(grandTotalBalanceAmount).format('0,0.00 $');

  saleList.grandTotalDueAmountKhr = numeral(grandTotalDueAmount * exchange.rates[0].rate).format('0,0');
  saleList.grandTotalPaidAmountKhr = numeral(grandTotalPaidAmount * exchange.rates[0].rate).format('0,0');
  saleList.grandTotalBalanceAmountKhr = numeral(grandTotalBalanceAmount * exchange.rates[0].rate).format('0,0');

  return saleList;

}
