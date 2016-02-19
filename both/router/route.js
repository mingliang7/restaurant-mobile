Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
  this.route('restaurant.data', {
    path: '/restaurant/data',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.setting', {
    path: '/restaurant/setting',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('tables', {
    path: '/restaurant/tables',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('table.locations', {
    path: '/restaurant/table-locations',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('tables.show', {
    path: '/tables/:id',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('exchange.rate', {
    path: '/restaurant/exchange-rate',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('category', {
    path: '/restaurant/category',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('unit', {
    path: '/restaurant/unit',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('product', {
    path: '/restaurant/product',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
});
