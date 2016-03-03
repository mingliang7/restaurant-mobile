
Template.restaurantSaleReport.onRendered(function () {

});
Template.restaurantSaleReport.helpers({
   customers(){
       return ReactiveMethod.call('getCustomerList');
   }
});

Template.restaurantSaleReportGen.helpers({
    getGrandTotalConvert:function(obj,key){
      return obj[key];
    },
    multiply: function (val1, val2, id) {
        var value = (val1 * val2);
        if (id != null && id == "KHR") {
            value = roundRielCurrency(value);
            return numeral(value).format('0,0.00');
        }
        return numeral(value).format('0,0.00');
    },
    options: function () {
        return {
            //fontSize: 'bg',
            paper: 'a4',
            orientation: 'portrait'
        };
    },
    data: function () {
        var q=Router.current().params.query;
        var params = JSON.stringify(q);

        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getSaleReport', params);
        return Fetcher.get(params);
    }
});


