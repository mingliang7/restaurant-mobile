Tracker.autorun(function () {
    if(Session.get('chart')){
        drawChart(Session.get('chart'));
    }
});


Template.chart.onCreated(function chartOnCreated() {
    //Write Something Here
});
Template.chart.onRendered(function () {
    if(Session.get('chart') === undefined){
        Meteor.call('saleInSemester', function(err, result){
           Session.set('chart', result);
        });
    }
});

Template.chart.onDestroyed(function () {
    Session.set('chart', undefined);
});
Template.chart.helpers({
    myChart: function () {

    },
    setChartId(){

        return '';
    }
});

Template.chart.events({
    //Write Something Here
});
function drawChart(data) {

    // options = {
    //     responsive: true
    // };
    // debugger
    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#myChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx, {
    });

    new Chart(ctx).Line(data);
}
