Router.map(function() {
  this.route('stock.in.group.name.report', {
    path: '/restaurant/stock-in-group-name-report',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('stock.in.group.name.report.gen', {
    path: '/restaurant/stock-in-group-name-report-gen',
    layoutTemplate: 'reportLayout'
  });

});
