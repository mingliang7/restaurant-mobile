Meteor.methods({
    getSaleReportWithProduct: function (arg) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        var params = {};
        params.$or = [{
          '_customer.type': 'normal'
        }, {
          '_customer.type': {
            $exists: false
          }
        }];
        var fromDate = moment(arg.fromDate, "YYYY/MM/DD HH:mm").toDate();
        var toDate = moment(arg.toDate, "YYYY/MM/DD HH:mm").toDate();
        var customerId = arg.customerId;

        data.title = Restaurant.Collection.Company.findOne();
        var customer = "ទាំងអស់", status = "ទាំងអស់", staff = "ទាំងអស់";
        if (fromDate != null && toDate != null) params.saleDate = {$gte: fromDate, $lte: toDate};
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
        data.grandTotal = content.grandTotal;
        data.subTotal = content.subTotal;
        data.grandTotalConvert = content.grandTotalConvert;
        if (content.length > 0) {
            data.content = content;
        }
        return data;

    }
});

function calculateSaleHelper(sl) {
    var grandTotal = 0;
    var subTotal = 0;
    var grandTotalConvert = {};
    var saleList = [];
    var i = 1;

    sl.forEach(function (s) {
        s.saleDetailObj = getSaleDetail(s._id); // fetch all saleDetails with saleId
        grandTotal += s.total;
        subTotal += s.subTotal;
        s.order = i;
        s.exchangeRates = [];
        //var exchange = Restaurant.Collection.ExchangeRates.findOne(s.exchangeRateId);
        s._exchangeRate.rates.forEach(function (ex) {
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
    saleList.grandTotal = numeral(grandTotal).format('0,0');
    saleList.subTotal = numeral(subTotal).format('0,0');
    saleList.grandTotalConvert = [];
    for (var key in grandTotalConvert) {
        saleList.grandTotalConvert.push({
            toCurrencyId: key,
            totalConvert: numeral(grandTotalConvert[key]).format('0,0.00')
        });
    }
    return saleList;

}

let getSaleDetail = (saleId)=>{
  return Restaurant.Collection.SaleDetails.find({saleId: saleId}).fetch();
};
