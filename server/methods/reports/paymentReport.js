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

        var payments = Restaurant.Collection.Payments.aggregate([{
            $match: params
        }, {
            $group: {
                _id: null,
                payments: {
                    $addToSet: '$$ROOT'
                },
                grandTotalDueAmount: {
                    $sum: '$dueAmount'
                },
                grandTotalPaidAmount: {
                    $sum: '$truelyPaid'
                },
                grandTotalBalanceAmount: {
                    $sum: '$balanceAmount'
                }

            }
        }, {
            $sort: {
                _id: 1
            }
        }], {
            sort: {
                saleId: 1
            }
        });
        var header = {};
        header.date = arg.fromDate + ' ដល់ ' + arg.toDate;
        header.customer = customer;
        header.status = status;
        header.staff = staff;

        /****** Header *****/
        data.header = header;
        // var content = calculateSaleHelper(sale);
        // data.grandTotalDueAmount = content.grandTotalDueAmount;
        // data.grandTotalPaidAmount = content.grandTotalPaidAmount;
        // data.grandTotalBalanceAmount = content.grandTotalBalanceAmount;
        //
        // data.grandTotalDueAmountUsd = content.grandTotalDueAmountUsd;
        // data.grandTotalPaidAmountUsd = content.grandTotalPaidAmountUsd;
        // data.grandTotalBalanceAmountUsd = content.grandTotalBalanceAmountUsd;
        //
        // //return reportHelper;
        // /****** Content *****/
        // if (content.length > 0) {
        //   data.content = content;
        // }
        // return data;
        data.content = payments
        return data;
    }
});

function calculateSaleHelper(sl) {
    var grandTotalDueAmount = 0;
    var grandTotalPaidAmount = 0;
    var grandTotalBalanceAmount = 0;

    var grandTotalDueAmountUsd = 0;
    var grandTotalPaidAmountUsd = 0;
    var grandTotalBalanceAmountUsd = 0;

    var exchange = Restaurant.Collection.ExchangeRates.findOne({}, {
        sort: {
            _id: -1
        }
    });
    // console.log(exchange.rates[0].rate);
    var subTotal = 0;
    var grandTotalConvert = {};
    var saleList = [];
    var i = 1;
    sl.forEach(function(s) {
        grandTotalDueAmount += s.dueAmount;
        grandTotalPaidAmount += s.truelyPaid;

        s.order = i;

        s.customer = Restaurant.Collection.Customers.findOne({
            _id: s.customerId
        }).name;
        s.paymentDate = moment(s.paymentDate).format("DD-MM-YY, HH:mm:ss");
        s.balanceAmount = s.dueAmount - s.truelyPaid;
        grandTotalBalanceAmount += s.balanceAmount;

        i++;
        saleList.push(s);
    });
    saleList.grandTotalDueAmount = numeral(grandTotalDueAmount).format('0,0');
    saleList.grandTotalPaidAmount = numeral(grandTotalPaidAmount).format('0,0');
    saleList.grandTotalBalanceAmount = numeral(grandTotalBalanceAmount).format('0,0');

    saleList.grandTotalDueAmountUsd = numeral(grandTotalDueAmount / exchange.rates[0].rate).format('0,0.00 $');
    saleList.grandTotalPaidAmountUsd = numeral(grandTotalPaidAmount / exchange.rates[0].rate).format('0,0.00 $');
    saleList.grandTotalBalanceAmountUsd = numeral(grandTotalBalanceAmount / exchange.rates[0].rate).format('0,0.00 $');

    return saleList;

}
