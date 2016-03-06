Router.map(function() {
    this.route('restaurant.sale.report', {
        path: '/restaurant/sale-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('restaurant.sale.report.gen', {
        path: '/restaurant/sale-report-gen',
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
