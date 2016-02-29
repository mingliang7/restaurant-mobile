Meteor.publish("tableLocations", () => {
  return Restaurant.Collection.TableLocations.find();
});

Meteor.publish('tables', () => {
  return Restaurant.Collection.Tables.find();
});
Meteor.publish("tableByLocation", function(tableLocationId, tableId) {
  let tables = Restaurant.Collection.Tables.find({
    _id: tableId,
    tableLocationId: tableLocationId
  });
  return tables;
});

Meteor.publish('units', () => {
  return Restaurant.Collection.Units.find();
});
Meteor.publish('categories', () => {
  return Restaurant.Collection.Categories.find();
});
Meteor.publish('category', (categoryId) => {
  return Restaurant.Collection.Categories.find(categoryId);
});
Meteor.publish('products', (limit) => {
  let amount = limit || 10
  return Restaurant.Collection.Products.find({}, {
    limit: amount
  });
});
Meteor.publish('exchangeRates', () => {
  return Restaurant.Collection.ExchangeRates.find();
});

Meteor.publish('images', () => {
  return Images.find();
});

Meteor.publish("customers", (limit) => {
  return Restaurant.Collection.Customers.find({}, {
    limit: limit
  });
});

Meteor.publish("notes", () => {
  return Restaurant.Collection.Notes.find();
});

Meteor.publish("staffs", () => {
  return Restaurant.Collection.Staffs.find();
});


Meteor.publish("tableInLocationId", (tableLocationId) => {
  return Restaurant.Collection.Tables.find({
    tableLocationId: tableLocationId
  });
});

Meteor.publish("productByCategory", (categoryId, limit) => {
  let amount = limit || 12;
  return Restaurant.Collection.Products.find({
    categoryId: categoryId
  }, {
    limit: amount
  });
});
//count product by category
Meteor.publish("countProductByCategory", function(categoryId) {
  Counts.publish(this, 'productCount', Restaurant.Collection.Products.find({
    categoryId: categoryId
  }));
  this.ready();
});

Meteor.publish("sale", (id) => {
  return Restaurant.Collection.Sales.find(id, {
    status: 'active'
  });
});


Meteor.publish("saleDetails", (saleId, limit) => {
  let amount = limit || 5;
  return Restaurant.Collection.SaleDetails.find({
    saleId: saleId
  }, {
    limit: amount
  });
  this.ready();
});
//count saleDetail by saleId
Meteor.publish("saleDetailCount", function(saleId) {
  Counts.publish(this, 'saleDetailCount', Restaurant.Collection.SaleDetails.find({
    saleId: saleId
  }));
  this.ready();
});

Meteor.publish("saleDetail", (id) => {
  return Restaurant.Collection.Sales.find(id)
});

Meteor.publish('saleDetailBySelfId', (saleId, selfId) => {
  return Restaurant.Collection.SaleDetails.find({
    saleId: saleId,
    _id: selfId
  });
});

Meteor.publish("company", () => {
  return Restaurant.Collection.Company.find();
});

Meteor.publish("currencies", () => {
  return Restaurant.Collection.Currency.find();
});

Meteor.publish("existSales", () => {
  return Restaurant.Collection.Sales.find({
    status: 'active',
    _payment: {
      $exists: false
    }
  });
});

//find active sale
Meteor.publish("activeSales", (limit) => {
  let amount = limit || 10;
  return Restaurant.Collection.Sales.find({
    status: 'active'
  }, {
    limit: amount
  });
});

Meteor.publish('activeSalesCount', function() {
  Counts.publish(this, 'activeSalesCount', Restaurant.Collection.Sales.find({
    status: 'active'
  }));
  this.ready();
})


//product search
Meteor.publish('productsSearch', function(query) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  let restaurant = Restaurant.Collection.Products.search(query);
  return restaurant;
});

Meteor.publish('productCount', function() {
  Counts.publish(this, 'productCounts', Restaurant.Collection.Products.find());
  this.ready();
})

//sale search
Meteor.publish('salesSearch', function(query) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  return Restaurant.Collection.Sales.search(query);
});

Meteor.publish('searchSaleForMerge', function(query, saleId) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  let sales = Restaurant.Collection.Sales.search(query, saleId);
  console.log(sales.count());
  return sales;
});
