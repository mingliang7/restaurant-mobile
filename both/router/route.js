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
  })

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
  this.route('restaurant.customer', {
    path: '/restaurant/customers',
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
  this.route('restaurant.note', {
    path: '/restaurant/notes',
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

  this.route('restaurant.staff', {
    path: '/restaurant/staffs',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.sale', {
    path: '/restaurant/sale',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.sale.table.location.show', {
    path: '/restaurant/sale/:tableLocationId',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.sale.checkout.invoice', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/checkout/:invoiceId',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });


  this.route('company', {
    path: '/restaurant/company',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.sale.checkout.invoice.category.product', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/checkout/:invoiceId/category/:categoryId',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.sale.table.saleInvoice', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
  this.route('restaurant.sale.table.saleInvoice.editSale', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSale',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
  this.route('restaurant.sale.table.saleInvoice.edit.discount', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editDiscount',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
  this.route('edit.sale.detail', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/editSaleDetail/:saleDetailId',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
});
