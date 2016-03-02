Router.map(function() {
    this.route('restaurant.outstanding.report', {
        path: '/restaurant/outstanding-report',
        layoutTemplate: 'invoiceLayout',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
    this.route('restaurant.outstanding.report.gen', {
        path: '/restaurant/outstanding-report-gen',
        layoutTemplate: 'invoiceLayout',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }
    });
});
