
Template.restaurantSaleReport.onRendered(function () {

});
Template.restaurantSaleReport.helpers({
   customers(){
       return ReactiveMethod.call('getCustomerList');
   },
    status(){
        return [{value:"active",label:"active"},{value:"closed",label:"closed"}]
    },
    users(){
        return ReactiveMethod.call('getUserList');
    }
});

Template.restaurantSaleReportGen.helpers({
    data: function () {
        var query=Router.current().params.query;
        var params = "saleReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getSaleReport', query);
        return Fetcher.get(params);
    }
});


