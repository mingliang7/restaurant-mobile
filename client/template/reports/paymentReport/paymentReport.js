Template.restaurantPaymentReport.onRendered(function() {
    $('[name="fromDate"]').datetimepicker();
    $('[name="toDate"]').datetimepicker();
});
Template.restaurantPaymentReport.helpers({
    customers() {
        return ReactiveMethod.call('getCustomerList');
    },
    status() {
        return [{
            value: "closed",
            label: "ទូរទាត់ហើយ"
        }, {
            value: "partial",
            label: "ជំពាក់"
        }]
    },
    users() {
        return ReactiveMethod.call('getUserList');
    }
});

Template.restaurantPaymentReportGen.helpers({
    data: function() {
        var query = Router.current().params.query;
        var params = "paymentReport";
        Fetcher.setDefault(params, false);
        Fetcher.retrieve(params, 'getPaymentReport', query);
        return Fetcher.get(params);
    },
    statusCanceled(status) {
        if (status == 'canceled') {
            return true;
        }
    },
    partial(status, saleDate, paymentDate) {
        let currentSaleDate = moment(saleDate).format('YYYY-MM-DD');
        let currentPaymentDate = paymentDate.split(',')[0];
        debugger
        if(status == 'partial'){
          return true;
        }
        if(currentSaleDate < currentPaymentDate){
          return true;
        }
        return false;
    }
});

AutoForm.hooks({
    restaurantSaleReport: {}
});
