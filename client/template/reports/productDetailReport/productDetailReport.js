Template.restaurantProductDetailReport.helpers({
    categories(){
        return ReactiveMethod.call('getCategoryList');
    }
});

Template.restaurantProductDetailReportGen.helpers({
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
        var query = Router.current().params.query;
        var params = "getProductDetailReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getProductDetailReport', query);
        return Fetcher.get(params);

    },
    fetchMaterial(id){
      let material = ReactiveMethod.call('getMaterial', id);
      return material;
    }
});
