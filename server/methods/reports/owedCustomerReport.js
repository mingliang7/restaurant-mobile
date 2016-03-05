Meteor.methods({
    getOutstandingReport: function (arg) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };
        var params = {};
        var date = moment(arg.date + " 23:59:59").toDate();
        var customerId = arg.customerId;

        var customer = "ទាំងអស់";
        if (customerId != null && customerId != "") {
            params.customerId = customerId;
            customer = Restaurant.Collection.Customers.findOne(customerId).name;
        }

        params.saleDate = {$lte: date};
        data.title = Restaurant.Collection.Company.findOne();
        var header = {};
        header.date = arg.date;
        header.customer = customer;
        data.header = header;

        var content = [];
        var sales = Restaurant.Collection.Sales.find(params);
        var i = 1;
        sales.forEach(function (s) {
            s.saleDate = moment(s.saleDate).format("DD-MM-YYYY HH:mm:ss");
            s.order = i;
            s.paidAmount = numeral(s.paidAmount).format('0,0.00');
            s.total = numeral(s.total).format('0,0.00');
            s.balanceAmount = numeral(s.balanceAmount).format('0,0.00');
            i++;
            content.push(s);
        });
        /****** Header *****/
        if (content.length > 0) {
            data.content = content;
        }
        return data;
    }
});
