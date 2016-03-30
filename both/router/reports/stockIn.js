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

  this.route('restaurant.stock.in.adjustment.report', {
    path: '/restaurant/stock-in-adjustment-report',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.stock.in.adjustment.report.gen', {
    path: '/restaurant/stock-in-adjustment-report-gen',
    layoutTemplate: 'reportLayout'
  });

  this.route('restaurant.stock.in.os.report', {
    path: '/restaurant/stock-in-os-report',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.stock.in.os.report.gen', {
    path: '/restaurant/stock-in-os-report-gen',
    layoutTemplate: 'reportLayout'
  });
});
