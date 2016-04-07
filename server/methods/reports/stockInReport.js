Meteor.methods({
  getStockInReport: function(arg) {
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
    var toDate = moment(arg.toDate, "YYYY/MM/DD HH:mm").add('1', 'days').toDate();

    data.title = Restaurant.Collection.Company.findOne();
    // var customer = "ទាំងអស់", status = "ទាំងអស់", staff = "ទាំងអស់";
    // var status =  status = "ទាំងអស់";
    if (fromDate != null && toDate != null) params.stockInDate = {
      $gte: fromDate,
      $lt: toDate
    };
    // if (customerId != null && customerId != "") {
    //     params.customerId = customerId;
    //     customer = Restaurant.Collection.Customers.findOne(customerId).name;
    // }
    params.type = 'order';
    var sale = Restaurant.Collection.StockIn.find(params);
    var header = {};
    header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    // header.customer = customer;

    /****** Header *****/
    data.header = header;
    var content = calculateSaleHelper(sale);

    /****** Content *****/
    if (content.length > 0) {
      data.content = content;
    }
    return data;

  }
});

function calculateSaleHelper(sl) {
  var saleList = [];
  var i = 1;
  sl.forEach(function(s) {
    // grandTotal += s.total;
    s.order = i;
    s.stockInDate = moment(s.stockInDate).format("DD-MM-YY, HH:mm:ss");
    s.amount =  s.price * s.qty;
    i++;
    saleList.push(s);
  });
  return saleList;
}
