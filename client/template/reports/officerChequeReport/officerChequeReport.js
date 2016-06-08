Template.officerChequeReport.onRendered(function () {
    $('[name="fromDate"]').datetimepicker();
    $('[name="toDate"]').datetimepicker();
});
Template.officerChequeReport.helpers({
    customers() {
        return ReactiveMethod.call('getCustomerListByType');
    },
    users() {
        return ReactiveMethod.call('getUserList');
    }
});

Template.officerChequeReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var call = Meteor.callAsync(query, 'getOfficerChequeReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();
    },
    statusCanceled(status){
        if (status == 'canceled') {
            return true;
        }
    }
});

AutoForm.hooks({
    officerChequeReport: {}
});
