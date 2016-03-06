Router.map(function() {
    this.route('restaurant.outstanding.report', {
        path: '/restaurant/outstanding-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('restaurant.outstanding.report.gen', {
        path: '/restaurant/outstanding-report-gen',
        layoutTemplate: 'reportLayout'
    });
});
