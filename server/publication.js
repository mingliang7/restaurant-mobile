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
  if (tables) {
    return tables;
  }
  return this.ready();
});

Meteor.publish('units', () => {
  return Restaurant.Collection.Units.find();
});
Meteor.publish('categories', () => {
  return Restaurant.Collection.Categories.find();
});
Meteor.publish('category', (categoryId) => {
  let categories = Restaurant.Collection.Categories.find(categoryId);
  if (categories) {
    return categories;
  }
  return this.ready();
});
Meteor.publish('materialCategories', () => {
  let categories = Restaurant.Collection.MaterialCategories.find();
  if (categories) {
    return categories;
  }
  return this.ready();
});
Meteor.publish('products', (limit) => {
  let amount = limit || 10;
  let products = Restaurant.Collection.Products.find({}, {
    limit: amount
  });
  if (products) {
    return products;
  }
  return this.ready();
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
  let tables = Restaurant.Collection.Tables.find({
    tableLocationId: tableLocationId
  });
  if (tables) {
    return tables;
  }
  return this.ready();
});

Meteor.publish("productByCategory", (categoryId, limit) => {
  let amount = limit || 12;
  let products = Restaurant.Collection.Products.find({
    categoryId: categoryId
  }, {
    limit: amount
  });
  if (products) {
    return products;
  }
  return this.ready();
});
//count product by category
Meteor.publish("countProductByCategory", function(categoryId) {
  Counts.publish(this, 'productCount', Restaurant.Collection.Products.find({
    categoryId: categoryId
  }));
  this.ready();
});

Meteor.publish("sale", (id) => {
  let sales = Restaurant.Collection.Sales.find(id, {
    status: 'active'
  });
  if (sales) {
    return sales;
  }
  return this.ready();
});

Meteor.publish("closedSale", (id) => {
  let sales = Restaurant.Collection.Sales.find(id, {
    status: {
      $in: ['closed', 'canceled']
    }
  });
  if (sales) {
    return sales;
  }
  return this.ready();
});


Meteor.publish("saleDetails", (saleId, limit) => {
  let amount = limit || 5;
  let saleDetails = Restaurant.Collection.SaleDetails.find({
    saleId: saleId
  }, {
    limit: amount
  });
  if (saleDetails) {
    return saleDetails;
  }
  return this.ready();
});
//count saleDetail by saleId
Meteor.publish("saleDetailCount", function(saleId) {
  Counts.publish(this, 'saleDetailCount', Restaurant.Collection.SaleDetails.find({
    saleId: saleId
  }));
  this.ready();
});

Meteor.publish("saleDetail", (id) => {
  let saleDetail = Restaurant.Collection.Sales.find(id)
  if (saleDetail) {
    return saleDetail;
  }
  return this.ready();
});

Meteor.publish('saleDetailBySelfId', (saleId, selfId) => {
  let saleDetails = Restaurant.Collection.SaleDetails.find({
    saleId: saleId,
    _id: selfId
  });
  if (saleDetails) {
    return saleDetails;
  }
  return this.ready();
});

Meteor.publish("company", () => {
  return Restaurant.Collection.Company.find();
});

Meteor.publish("currencies", () => {
  return Restaurant.Collection.Currency.find();
});

Meteor.publish("existSales", function() {
  return Restaurant.Collection.Sales.find({
    status: 'active'
  });
});

//find active sale
Meteor.publish("activeSales", (saleStatus, limit) => {
  let amount = limit || 10;
  let status = saleStatus || 'active';
  let sales = Restaurant.Collection.Sales.find({
    status: status
  }, {
    limit: amount
  });
  if (sales) {
    return sales;
  }
  return this.ready();
});

Meteor.publish('activeSalesCount', function() {
  Counts.publish(this, 'activeSalesCount', Restaurant.Collection.Sales.find({
    status: 'active'
  }));
  this.ready();
});


//product search
Meteor.publish('productsSearch', function(query, limit) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  let limitAmount = limit || 10;
  let restaurant = Restaurant.Collection.Products.search(query, limitAmount);
  return restaurant;
});

Meteor.publish('productCount', function() {
  Counts.publish(this, 'productCounts', Restaurant.Collection.Products.find());
  this.ready();
});

//sale search
Meteor.publish('salesSearch', function(query) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  return Restaurant.Collection.Sales.search(query);
});

Meteor.publish("searchSaleByTable", function(query, filter, status, date, limit) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  let locations = [];
  if (!_.isEmpty(filter)) {
    for (let k in filter) {
      locations.push(filter[k]);
    }
  }
  return Restaurant.Collection.Sales.searchByTable(query, locations, status, date, limit);
});

Meteor.publish('searchSaleForMerge', function(query, saleId) {
  if (_.isEmpty(query)) {
    return this.ready();
  }
  let sales = Restaurant.Collection.Sales.search(query, saleId);
  if (sales) {
    return sales;
  }
  return this.ready();
});


Meteor.publish("paymentList", function(saleId) {
  let payments = Restaurant.Collection.Payments.find({
    saleId: saleId
  });
  if (payments) {
    return payments;
  }
  return this.ready();
});

//active users
Meteor.publish("activeUsers", function() {
  let users = Meteor.users.find({
    'profile.status': 'active'
  });
  if (users) {
    return users;
  }
  return this.ready();
});


//publish roles
Meteor.publish("null", function() {
  return Meteor.roles.find({});
});

Meteor.publish("tableByMultiLocation", function(argument) {
  console.log(argument);
  if (!_.isNull(argument)) {
    return Restaurant.Collection.Tables.find({
      tableLocationId: {
        $in: argument
      }
    });
  }
  return this.ready();
});
//publish vipcard
Meteor.publish("vipcards", function(obj) {
  let selector = obj || {};
  let vipcards = Restaurant.Collection.Vipcards.find(selector);
  if (vipcards) {
    return vipcards;
  }
  return this.ready();
});
//publish latest exchangeRates
Meteor.publish("latestExchange", function() {
  return Restaurant.Collection.ExchangeRates.find({}, {
    sort: {
      _id: -1
    },
    limit: 1
  })
});


//material search
Meteor.publish("materialSearch", function(query, limit) {
  return Restaurant.Collection.Materials.search(query, limit);
});

//publish material with 100 records

Meteor.publish("materials", function(limit) {
  let limitAmount = limit || 100;
  return Restaurant.Collection.Materials.find({}, {
    sort: {
      name: 1
    },
    limit: limitAmount
  });
});


//publish stockIn with status active

Meteor.publish("stockIn", function(querySelector,selector) {
  let stockIns = Restaurant.Collection.StockIn.find(querySelector, selector);
  if (stockIns) {
    return stockIns;
  }
  return this.ready();
});

Meteor.publish("stocks", function(selector) {
  let stocks = Restaurant.Collection.Stocks.find({},selector);
  if (stocks) {
    return stocks;
  }
  return this.ready();
});

//publish end of process
Meteor.publish("endOfProcess", function(selector) {
  let eops = Restaurant.Collection.EndOfProcess.find({}, selector);
  if (eops) {
    return eops;
  }
  return this.ready();
});

//count stockIn
Meteor.publish("countStockIn", function(stockId) {
  Counts.publish(this, 'countStockIn', Restaurant.Collection.StockIn.find({stockId: stockId}));
  this.ready();
});

//count stocks
Meteor.publish("countStocks", function() {
  Counts.publish(this, 'countStocks', Restaurant.Collection.Stocks.find());
  this.ready();
});

//publish supplier
Meteor.publish("suppliers", function(){
  let suppliers = Restaurant.Collection.Suppliers.find();
  if(suppliers){
    return suppliers;
  }
  return this.ready();
});
