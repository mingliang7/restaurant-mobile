Template.stockInGroupNameReport.onRendered(function () {
    $('[name="fromDate"]').datetimepicker();
    $('[name="toDate"]').datetimepicker();
});
Template.stockInGroupNameReport.helpers({
    // customers() {
    //   return ReactiveMethod.call('getCustomerList');
    // },
    // status() {
    //   return [{
    //     value: "active",
    //     label: "មិនទាន់បានកាត់ស្តុុក"
    //   }, {
    //     value: "closed",
    //     label: "បានកាត់ស្តុករួចរាល់"
    //   }
    //   , {
    //     value: "partial",
    //     label: "ជំពាក់"
    //   }, {
    //     value: "canceled",
    //     label: "បោះបង់"
    //   }
    // ]
    // },
    users() {
        return ReactiveMethod.call('getUserList');
    }
});

Template.stockInGroupNameReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var call = Meteor.callAsync(query, 'getStockInGroupNameReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();
    }
});

AutoForm.hooks({
    restaurantSaleReport: {}
});
