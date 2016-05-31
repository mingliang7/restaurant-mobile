Meteor.methods({
  getSummaryReport: function(arg) {
    var data = {
      title: {},
      sales: {},
      payments: {},
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
    let exchange = Restaurant.Collection.ExchangeRates.findOne({},{sort: {_id: -1}});
    if (fromDate != null && toDate != null) params.saleDate = {
      $gte: fromDate,
      $lt: toDate
    };
    params.status = {
        $in: ['active', 'partial']
    }
    // params['_customer.type'] = arg.staff
      // if (customerId != null && customerId != "") {
      //     params.customerId = customerId;
      //     customer = Restaurant.Collection.Customers.findOne(customerId).name;
      // }
      // params.type = 'order';

    var sales = Restaurant.Collection.Sales.aggregate([{
      $match: params
    }, {
      $group: {
        _id: '$status',
        invoices: {
          $push: {_id: '$_id', tableId: '$tableId', 'tableLocation': '$tableLocation'}
        },
        total: {
          $sum: '$total'
        },
        balanceAmount: {
          $sum: '$balanceAmount'
        },
        paidAmount: {
          $sum: '$paidAmount'
        },
        count: {
          $sum: 1
        },

      }
    }], {
      sort: {
        _id: 1
      }
    })
    var actualSales = Restaurant.Collection.Sales.aggregate([{
      $match: {
        saleDate: {
          $gte: fromDate,
          $lt: toDate
        },
        status: {
          $nin: ['canceled', 'transfer']
          // $in: ['closed', 'active', 'partial']
        },
        // '_customer.type': arg.staff
      }
    }, {
      $group: {
        _id: 'បានលក់ជាក់ស្តែង',
        total: {
          $sum: '$total'
        },
        count: {
          $sum: 1
        }
      }
    }], {
      sort: {
        _id: 1
      }
    })
    if(arg.staff == 'normal'){
      var payments = Restaurant.Collection.Payments.aggregate([{
        $match: {
          paymentDate: {
            $gte: fromDate,
            $lt: toDate
          }
        }
      }, {
        $group: {
          _id: 'បានបញ្ចប់ និងបង់ប្រាក់',
          total: {
            $sum: '$truelyPaid'
          },
          count: {
            $sum: 1
          }
        }
    }])
    }
    data.payments = payments || [];
    data.sales = sales;
    data.actualSales = actualSales;
    data.header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
    data.header.customer = arg.staff == 'normal' ? 'ធម្មតា' : 'បុគ្គលិក'

    return data;

  }
});

function calculateSaleHelper(sl) {
  var grandTotalActive = 0;
  var grandTotalClosed = 0;
  var grandTotalPayment = 0;
  var grandTotalPartial = 0;
  var saleList = [];
  var i = 1;
  sl.forEach(function(s) {
    s.order = i;

    if (s.status == "active") {
      grandTotalActive += s.balanceAmount;
    } else if (s.status == "closed") {
      grandTotalClosed += s.balanceAmount;
    } else if (s.status == "partial") {
      grandTotalPartial += s.balanceAmount;
    } else {
      grandTotalPayment += s.paidAmount;
    }

    i++;
    saleList.push(s);
  });
  console.log(saleList);
  return saleList;
}
