Template.officerChequeDetailReport.onRendered(function () {
    $('[name="fromDate"]').datetimepicker();
    $('[name="toDate"]').datetimepicker();
});
Template.officerChequeDetailReport.helpers({
    customers() {
        return ReactiveMethod.call('getCustomerListByType');
    },
    users() {
        return ReactiveMethod.call('getUserList');
    }
});

Template.officerChequeDetailReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var call = Meteor.callAsync(query, 'officerChequeDetailReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();
    },
    convertToDollar(amount){
        let exchange = Restaurant.Collection.ExchangeRates.findOne({}, {sort: {created: -1}});
        return numeral(amount / exchange.rates[0].rate).format('0,0.00');
    },
    statusCanceled(status){
        if (status == 'canceled') {
            return true;
        }
    }
});

AutoForm.hooks({
    OfficerChequeDetailReport: {}
});
