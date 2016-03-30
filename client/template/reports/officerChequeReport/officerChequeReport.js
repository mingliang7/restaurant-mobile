Template.officerChequeReport.onRendered(function() {
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
  data: function() {
    var query = Router.current().params.query;
    var params = "getOfficerChequeReport";
    Fetcher.setDefault(params, false);
    Fetcher.retrieve(params, 'getOfficerChequeReport', query);
    return Fetcher.get(params);
  },
  statusCanceled(status){
    if(status == 'canceled'){
      return true;
    }
  }
});

AutoForm.hooks({
  officerChequeReport: {}
});
