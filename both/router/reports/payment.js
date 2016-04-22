Router.map(function() {
    this.route('restaurant.payment.report', {
        path: '/restaurant/payment-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('restaurant.payment.report.gen', {
        path: '/restaurant/payment-report-gen',
        layoutTemplate: 'reportLayout',
       /* onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }*/
    });
});
