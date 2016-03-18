Meteor.methods({
  getOutstandingReport: function(arg) {
    var data = {
      title: {},
      header: {},
      content: [{
        index: 'No Result'
      }],
      footer: {}
    };
    var params = {};
    // var date = moment(arg.date,'YYYY/MM/DD HH:mm').toDate();
    var customerId = arg.customerId;
    var tomorrow = moment(arg.date, 'YYYY-MM-DD').add(1, 'days').toDate();
    var today = moment(arg.date).toDate();
    var customer = "ទាំងអស់";
    if (customerId != null && customerId != "") {
      params.customerId = customerId;
      customer = Restaurant.Collection.Customers.findOne(customerId).name;
    }

    params.saleDate = {
      $lt: tomorrow
    };
    params.$or = [{
      statusDate: {
        $gt: today
      }
    }, {
      status: 'partial'
    }];
    data.title = Restaurant.Collection.Company.findOne();
    var header = {};
    header.date = arg.date;
    header.customer = customer;
    data.header = header;

    var content = [];
    var sales = Restaurant.Collection.Sales.find(params);
    var index = 1;
    var tmpPayment = [];
    sales.forEach(function(sale) {
      sale.index = index;
      if (!_.isUndefined(sale._payment) && sale.paidAmount != 0) {
        sale._payment.forEach(function(payment) {
          if (payment.paymentDate <= today) {
            tmpPayment.push(payment);
          }
        });
        sale._payment = tmpPayment.last();
      } else {
        sale._payment = {
          dueAmount: sale.total,
          paidAmount: sale.paidAmount,
          balanceAmount: sale.balanceAmount
        };
      }
      content.push(sale);
      index++;
    });
    if (content.length > 0) {
      data.content = content;
    }
    return data;
  }
});
