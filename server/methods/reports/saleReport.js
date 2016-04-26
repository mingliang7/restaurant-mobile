Meteor.methods({
  getSaleReport: function(arg) {
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
    if (fromDate != null && toDate != null) params.saleDate = {
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

    var sale = Restaurant.Collection.Sales.find(params, {sort: {_id: 1}});
    var header = {};
    header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    header.customer = customer;
    header.status = status;
    header.staff = staff;

    /****** Header *****/
    data.header = header;
    var content = calculateSaleHelper(sale);
    //data.grandTotalOwedAmount = content.grandTotalOwedAmount;
    data.grandTotal = content.grandTotal;
    data.discount = content.discount;
    data.subTotal = content.subTotal;
    //data.grandTotalCost = content.grandTotalCost;
    data.grandTotalConvert = content.grandTotalConvert;
    //return reportHelper;
    /****** Content *****/
    if (content.length > 0) {
      data.content = content;
    }
    return data;

  }
});

function calculateSaleHelper(sl) {
  var grandTotal = 0;
  var subTotal = 0;
  var discount = 0;
  var grandTotalConvert = {};
  var saleList = [];
  var i = 1;
  sl.forEach(function(s) {
    grandTotal += s.total;
    subTotal += s.subTotal;
    discount += s.discount;
    s.order = i;
    s.exchangeRates = [];
    //var exchange = Restaurant.Collection.ExchangeRates.findOne(s.exchangeRateId);
    s._exchangeRate.rates.forEach(function(ex) {
      ex.exTotal = s.total / ex.rate;
      if (grandTotalConvert[ex.toCurrencyId] == null) {
        grandTotalConvert[ex.toCurrencyId] = 0
      }
      grandTotalConvert[ex.toCurrencyId] += ex.exTotal;
      ex.exTotalFormatted = numeral(ex.exTotal).format('0,0.00');
      s.exchangeRates.push(ex);

    });
    s.saleDate = moment(s.saleDate).format("DD-MM-YY, HH:mm:ss");
    s.total = numeral(s.total).format('0,0.00');
    s.customer = s._customer.name;
    s.user = s._staff.profile.username;
    i++;
    saleList.push(s);
  });
  //saleList.grandTotalCost = numeral(grandTotalCost).format('0,0.00');
  //saleList.grandTotalPaidAmount = numeral(grandTotal - grandTotalOwedAmount).format('0,0.00');
  //saleList.grandTotalOwedAmount = numeral(grandTotalOwedAmount).format('0,0.00');
  saleList.grandTotal = numeral(grandTotal).format('0,0');
  saleList.subTotal = numeral(subTotal).format('0,0');
  saleList.discount = numeral(discount).format('0,0');
  saleList.grandTotalConvert = [];
  for (var key in grandTotalConvert) {
    saleList.grandTotalConvert.push({
      toCurrencyId: key,
      totalConvert: numeral(grandTotalConvert[key]).format('0,0.00')
    });
  }
  /*$.each(grandTotalConvert,function(key,value){
   saleList.grandTotalConvert.push({toCurrencyId:key,totalConvert:value});
   });*/
  return saleList;

}
