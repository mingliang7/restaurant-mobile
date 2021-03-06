Template.restaurantStockInOsReport.onRendered(function () {
    $('[name="date"]').datetimepicker();
});
Template.restaurantStockInOsReport.events({
  "click [name='materialId']": function(event, template){
    IonModal.open('_fetch_material');
  }
});
Template.restaurantStockInOsReport.helpers({
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

Template.restaurantStockInOsReportGen.helpers({
    data: function () {
        var query = Router.current().params.query;
        var call = Meteor.callAsync(query, 'getStockInOsReport', query);
        if (!call.ready()) {
            // method call has not finished yet
            return false;
        }
        return call.result();
    },
    totalBalancePlusTotalstockIn(openingBalance, stockIn){
      return openingBalance + stockIn;
    },
    inc(index){
      return index + 1 ;
    }
});

AutoForm.hooks({
    restaurantSaleReport: {}
});
