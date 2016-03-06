Router.map(function() {
    this.route('restaurant.sale.detail.report', {
        path: '/restaurant/sale-detail-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('restaurant.sale.detail.report.gen', {
        path: '/restaurant/sale-detail-report-gen',
        layoutTemplate: 'reportLayout'
    });
});
