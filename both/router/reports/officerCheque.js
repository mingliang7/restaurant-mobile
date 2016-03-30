Router.map(function() {
    this.route('officer.cheque.report', {
        path: '/restaurant/officer-cheque-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/');
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('officer.cheque.report.gen', {
        path: '/restaurant/officer-cheque-report-gen',
        layoutTemplate: 'reportLayout',
       /* onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/')
            }
            this.next();
        }*/
    });

    this.route('officer.cheque.detail.report', {
        path: '/restaurant/officer-cheque-detail-report',
        onBeforeAction: function(pause) {
            if (!Meteor.user()) {
                // render the login template but keep the url in the browser the same
                Router.go('/');
            }
            Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
            this.next();
        }
    });
    this.route('officer.cheque.detail.report.gen', {
        path: '/restaurant/officer-cheque-detail-report-gen',
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
