Router.map(function() {
  this.route('restaurant.summary.report', {
    path: '/restaurant/summary-report',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.summary.report.gen', {
    path: '/restaurant/summary-report-gen',
    layoutTemplate: 'reportLayout'
  });
});
