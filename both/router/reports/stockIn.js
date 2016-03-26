Router.map(function() {
  this.route('restaurant.stock.in.report', {
    path: '/restaurant/stock-in-report',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.stock.in.report.gen', {
    path: '/restaurant/stock-in-report-gen',
    layoutTemplate: 'reportLayout'
  });
});
