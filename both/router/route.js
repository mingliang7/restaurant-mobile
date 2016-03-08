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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
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
      Session.set('categoryTags', {
        tags: {}
      })
      Session.set('productCountFromMethod', undefined);
      this.next();
    }
  });

  this.route('restaurant.sale.table.saleInvoice', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId',
    // action(){
    //   console.log(this)
    // },
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    },
    onAfterAction: function() {
      Session.set('paramsInvoiceId', this.router.current().params.invoiceId);
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
  this.route('restaurant.sale.payment', {
    path: '/restaurant/sale/:tableLocationId/table/:tableId/saleInvoice/:invoiceId/payment',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier'])
      this.next();
    }
  });

  //payment
  this.route('restaurant.active.payment', {
    path: '/restaurant/payment',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });

  this.route('restaurant.active.payment.show', {
    path: '/restaurant/payment/:saleId/show',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });

  this.route('restaurant.payment.list', {
    path: '/restaurant/payment/:saleId/list',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });


  //payment
  this.route('restaurant.active.payment.invoice', {
    path: '/restaurant/payment/:invoiceId',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });


  this.route('restaurant.item.transfer', {
    path: '/restaurant/item-transfer',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
  this.route('restaurant.invoice', {
    path: '/restaurant/invoice/:paymentId',
    layoutTemplate: 'invoiceLayout'
  });
  this.route('restaurant.sale.print', {
    path: '/restaurant/sale-print/:saleId',
    layoutTemplate: 'invoiceLayout',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      this.next();
    }
  });
  this.route('restaurant.report', {
    path: '/restaurant/report',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.user.profiles', {
    path: '/restaurant/user-profiles',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'super']);
      this.next();
    }
  })
});
