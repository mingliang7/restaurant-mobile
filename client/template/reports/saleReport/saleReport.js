Template.restaurantSaleReport.onRendered(function () {
    $('[name="fromDate"]').datetimepicker();
    $('[name="toDate"]').datetimepicker();
});
Template.restaurantSaleReport.helpers({
    customers(){
        return ReactiveMethod.call('getCustomerList');
    },
    status(){
        return [{value: "active", label: "active"}, {value: "closed", label: "closed"}]
    },
    users(){
        return ReactiveMethod.call('getUserList');
    }
});

Template.restaurantSaleReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var params = "saleReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getSaleReport', query);
        return Fetcher.get(params);
    }
});

AutoForm.hooks({
    restaurantSaleReport: {}
});