Restaurant.Collection.Sales.cacheDoc('table', Restaurant.Collection.Tables, ['name']);
Restaurant.Collection.Sales.cacheDoc('tableLocation', Restaurant.Collection.TableLocations, ['name']);
Restaurant.Collection.Sales.cacheDoc('customer', Restaurant.Collection.Customers, ['name']);
Restaurant.Collection.Sales.cacheDoc('staff', Meteor.users, ['profile']);
Restaurant.Collection.Sales.cacheDocBack('payment', Restaurant.Collection.Payments, [
    'paymentDate',
    'dueAmount',
    'balanceAmount',
    'paidAmount',
    'status'
  ],
  'saleId'
);
