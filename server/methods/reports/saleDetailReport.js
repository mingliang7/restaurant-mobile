Meteor.methods({
    getSaleDetailReport: function (arg) {
        var data = {
            title: {},
            header: {},
            content: [{index: 'No Result'}],
            footer: {}
        };

        var params = {status:"closed"};
        var fromDate = moment(arg.fromDate + " 00:00:00", "YYYY-MM-DD HH:mm:ss").toDate();
        var toDate = moment(arg.toDate + " 23:59:59", "YYYY-MM-DD HH:mm:ss").toDate();
        var customerId = arg.customerId;

        var categoryId = arg.categoryId;

        /****** Title *****/
        data.title = Restaurant.Collection.Company.findOne();

        if (fromDate != null && toDate != null) params.saleDate = {$gte: fromDate, $lte: toDate};
        if (customerId != null && customerId != "") params.customerId = customerId;


        var header = {};

        header.date = arg.fromDate + ' To ' + arg.toDate;
        var customer = "All", category = "All";
        if (customerId != null && customerId != "")
            customer = Restaurant.Collection.Customers.findOne(customerId).name;

        if (categoryId != null && categoryId != "")
            category = Restaurant.Collection.Categories.findOne(categoryId).name;
        header.customer = customer;
        header.category = category;

        /****** Header *****/
        data.header = header;
        var content = getSaleProducts(params, categoryId);
        data.grandTotal = content.grandTotal;
        data.grandTotalCost = content.grandTotalCost;
        //return reportHelper;
        /****** Content *****/
        if (content.length > 0) {
            data.content = content;
        }
        return data;
    }
});


function getSaleProducts(params, categoryId) {
    var saleIds = Restaurant.Collection.Sales.find(params, {fields: {_id: 1}}).map(function (sale) {
        return sale._id;
    });

    var selectorObj = {};
    selectorObj.saleId = {$in: saleIds};

    if (categoryId != null && categoryId != "") {
        var productIds = Restaurant.Collection.Products.find({
            categoryId: categoryId
        }, {fields: {_id: 1}}).map(function (p) {
            return p._id;
        });
        selectorObj.productId = {$in: productIds};
    }

    var result = [];
    var saleDetails = Restaurant.Collection.SaleDetails.find(
        selectorObj,
        {fields: {productId: 1, quantity: 1, price: 1, amount: 1, totalCost: 1, _product: 1}});
    (saleDetails.fetch()).reduce(function (res, value) {
        if (!res[value.productId]) {
            res[value.productId] = {
                //  totalCost: value.totalCost,
                amount: value.amount,
                quantity: 0,
                productId: value.productId,
                productName: value._product.name + "(" + value._product._unit.name + ")"
            };
            result.push(res[value.productId])
        } else {
            res[value.productId].amount += value.amount;
            // res[value.productId].totalCost += value.totalCost;
        }
        res[value.productId].quantity += value.quantity;
        return res;
    }, {});
    var i = 1;
    var arr = [];
    var granTotalCost = 0;
    var grandTotal = 0;
    result.forEach(function (r) {
        grandTotal += r.amount;
        arr.push({
            order: i,
            productId: r.productId,
            productName: r.productName,
            // price: numeral(r.price).format('0,0.00'),
            quantity: r.quantity,
            total: numeral(r.amount).format('0,0.00')
            // totalCost: numeral(r.totalCost).format('0,0.00')
        });
        i++;
    });
    arr.grandTotal = numeral(grandTotal).format('0,0.00');
    // arr.grandTotalCost = numeral(granTotalCost).format('0,0.00');
    return arr;
}


