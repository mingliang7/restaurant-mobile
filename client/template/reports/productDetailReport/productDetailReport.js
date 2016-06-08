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
        var call = Meteor.callAsync(query, 'getProductDetailReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();

    },
    fetchMaterial(id){
        let material = ReactiveMethod.call('getMaterial', id);
        return material;
    }
});
