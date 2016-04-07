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
  this.route('materialCategory', {
    path: '/restaurant/materialCategory',
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
  this.route('restaurant.supplier', {
    path: '/restaurant/suppliers',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
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
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.stocks', {
    path: '/restaurant/stocks',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'cashier']);
      this.next();
    }
  });
  this.route('restaurant.stocks.new', {
    path: '/restaurant/stocks/new',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'super']);
      this.next();
    }
  });
  this.route('product.new', {
    path: '/restaurant/product/new',
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

  this.route('restaurant.active.payment.search', {
    path: '/restaurant/payment/search',
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
      Restaurant.Roles.checkRoles(Meteor.userId(), ['cashier','setting', 'super']);
      this.next();
    }
  });

  this.route('restaurant.payment.list', {
    path: '/restaurant/payment/:saleId/list',
    onBeforeAction: function(pause) {
      if (!Meteor.user()) {
        // render the login template but keep the url in the browser the same
        Router.go('/');
      }
      let saleId = Router.current().params.saleId;
      Meteor.call('saleEop',saleId, (err,result)=>{
        if(result.status){
          Router.go(`/`);
          alertify.warning('វិក័យប័ត្រត្រូវបានបិទបញ្ជីរួចរាល់!មិនអាចចូលទៅវិក័យប័ត្របង់ប្រាក់បាន :(');
        }
      });
      Restaurant.Roles.checkRoles(Meteor.userId(), ['cashier','setting', 'super']);
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

  this.route('restaurant.sale.list', {
    path: '/restaurant/saleList/location/:tableLocationId/table/:tableId/checkout/:invoiceId',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['seller', 'cashier', 'setting', 'super']);
      this.next();
    }
  })
  this.route('restaurant.select.table', {
    path: '/restaurant/selectTable',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['seller', 'cashier', 'setting', 'super']);
      this.next();
    }
  })
  this.route('restaurant.vipcard', {
    path: '/restaurant/vipcards',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'super']);
      this.next();
    }
  })
  this.route('restaurant.new.vipcard', {
    path: '/restaurant/vipcards/new',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'super']);
      this.next();
    }
  })
  this.route('restaurant.edit.vipcard', {
    path: '/restaurant/vipcards/:id/edit',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/')
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'super']);
      this.next();
    }
  });
  this.route('restaurant.materials', {
    path: '/restaurant/materials',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['setting', 'super']);
      this.next();
    }
  });
  this.route('restaurant.stockIn', {
    path: '/restaurant/:stockId/:stockDate/stockIn',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['cashier','setting', 'super']);
      this.next();
    }
  });
  this.route('restaurant.eop', {
    path: '/restaurant/eop',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['cashier','setting', 'super']);
      this.next();
    }
  });
  this.route('restaurant.new.eop', {
    path: '/restaurant/eop/new',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['cashier','setting', 'super']);
      this.next();
    }
  });
  this.route('restaurant.seeds', {
    path: '/restaurant/seeds',
    onBeforeAction(pause) {
      if (!Meteor.userId()) {
        Router.go('/');
      }
      Restaurant.Roles.checkRoles(Meteor.userId(), ['super']);
      this.next();
    }
  });
});
