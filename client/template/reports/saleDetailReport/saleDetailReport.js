Template.restaurantSaleDetailReport.created=function(){
  $('[name="fromDate"]').datetimepicker()
  $('[name="toDate"]').datetimepicker()
}

Template.restaurantSaleDetailReport.helpers({
    customers(){
        return ReactiveMethod.call('getCustomerList');
    },
    categories(){
        return ReactiveMethod.call('getCategoryList')
    }
});

Template.restaurantSaleDetailReportGen.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var query=Router.current().params.query;
        var params = "saleDetailReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getSaleDetailReport', query);
        return Fetcher.get(params);
    }

});
