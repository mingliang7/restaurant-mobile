Template.restaurantOutstandingReport.onRendered(function () {
});

Template.restaurantOutstandingReport.helpers({
    customers(){
        return ReactiveMethod.call('getCustomerList');
    }
});

Template.restaurantOutstandingReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var params = "getOutstandingReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getOutstandingReport', query);
        return Fetcher.get(params);
    }
});




