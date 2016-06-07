

Template.barChart.helpers({
    myChart(){
    },
    setChartId(){
        drawChart(Session.get('chart'));
        return '';
    }
});

Template.barChart.events({
    //Write Something Here
});
function drawChart(data) {

    // options = {
    //     responsive: true
    // };
    // debugger
    //Get context with jQuery - using jQuery's .get() method.
    var ctx = $("#myBarChart").get(0).getContext("2d");
    //This will get the first returned node in the jQuery collection.
    var myNewChart = new Chart(ctx, {
    });

    new Chart(ctx).Bar(data);
}
