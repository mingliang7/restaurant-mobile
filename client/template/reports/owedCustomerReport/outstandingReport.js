Template.restaurantOutstandingReport.onRendered(function () {
    $('[name="date"]').datetimepicker();
});

Template.restaurantOutstandingReport.helpers({
    customers() {
        return ReactiveMethod.call('getCustomerList');
    }
});

Template.restaurantOutstandingReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var call = Meteor.callAsync(query, 'getOutstandingReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();
    },
    footer: function () {
        var sales = this.content;
        var totalInFooter = ReactiveMethod.call('extractContent', sales);
        return totalInFooter;
    }
});
