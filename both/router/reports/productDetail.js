Router.map(function() {
    this.route('restaurant.product.detail.report', {
        path: '/restaurant/product-detail-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('restaurant.product.detail.report.gen', {
        path: '/restaurant/product-detail-report-gen',
        layoutTemplate: 'reportLayout'
    });
});
