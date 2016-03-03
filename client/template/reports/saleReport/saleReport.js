
Template.restaurantSaleReport.onRendered(function () {

});
Template.restaurantSaleReport.helpers({
   customers(){
       return ReactiveMethod.call('getCustomerList');
   }
});

Template.restaurantSaleReportGen.helpers({
    data: function () {
        debugger;
        var query=Router.current().params.query;
        var params = "saleReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getSaleReport', query);
        return Fetcher.get(params);
    }
});


