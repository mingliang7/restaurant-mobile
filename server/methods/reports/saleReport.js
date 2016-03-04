Meteor.methods({
    getSaleReport: function (arg) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        var params = {};
        var fromDate = moment(arg.fromDate + " 00:00:00","MM/DD/YYYY HH:mm:ss").toDate();
        var toDate = moment(arg.toDate + " 23:59:59","MM/DD/YYYY HH:mm:ss").toDate();
        var customerId = arg.customerId;

        data.title = Restaurant.Collection.Company.findOne(params);
        var customer = "All";
        if (fromDate != null && toDate != null) params.saleDate = {$gte: fromDate, $lte: toDate};
        if (customerId != null && customerId != "") {
            params.customerId = customerId;
            customer = Restaurant.Collection.Customers.findOne(customerId).name;
        }
        var sale = Restaurant.Collection.Sales.find();
        var header = {};
        header.date = arg.fromDate + ' To '+ arg.toDate;
        header.customer = customer;

        /****** Header *****/
        data.header = header;
        var content = calculateSaleHelper(sale);
        //data.grandTotalOwedAmount = content.grandTotalOwedAmount;
        data.grandTotal = content.grandTotal;
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
    var grandTotalConvert = {};
    var saleList = [];
    var i = 1;
    sl.forEach(function (s) {
        grandTotal += s.total;
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
        s.saleDate = moment(s.saleDate).format("DD-MM-YY, HH:mm");
        s.total = numeral(s.total).format('0,0.00');
        s.customer = s._customer.name;
        s.user = s._staff.profile.username;
        i++;
        saleList.push(s);
    });
    //saleList.grandTotalCost = numeral(grandTotalCost).format('0,0.00');
    //saleList.grandTotalPaidAmount = numeral(grandTotal - grandTotalOwedAmount).format('0,0.00');
    //saleList.grandTotalOwedAmount = numeral(grandTotalOwedAmount).format('0,0.00');
    saleList.grandTotal = numeral(grandTotal).format('0,0.00');
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



