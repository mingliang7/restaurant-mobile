Meteor.publish("tableLocations", () => {
  return Restaurant.Collection.TableLocations.find();
});

Meteor.publish('tables', () => {
  return Restaurant.Collection.Tables.find();
});

Meteor.publish('units', () => {
  return Restaurant.Collection.Units.find();
});
Meteor.publish('categories', () => {
  return Restaurant.Collection.Categories.find();
});
Meteor.publish('products', () => {
  return Restaurant.Collection.Products.find();
});
Meteor.publish('exchangeRates', () => {
  return Restaurant.Collection.ExchangeRates.find();
});

Meteor.publish('images', () => {
  return Images.find();
});

Meteor.publish("customers", () => {
  return Restaurant.Collection.Customers.find();
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


Meteor.publish("productByCategory", (categoryId) => {
  return Restaurant.Collection.Products.find({
    categoryId: categoryId
  });
});


Meteor.publish("sale", (id) => {
  return Restaurant.Collection.Sales.find(id);
});


Meteor.publish("saleDetails", (saleId) => {
  return Restaurant.Collection.SaleDetails.find({
    saleId: saleId
  });
});

Meteor.publish("saleDetail", (id) => {
  return Restaurant.Collection.Sales.find(id)
});

Meteor.publish('saleDetailBySelfId', (saleId, selfId) => {
  return Restaurant.Collection.SaleDetails.find({saleId: saleId, _id: selfId});
});

Meteor.publish("company", () => {
  return Restaurant.Collection.Company.find();
});

Meteor.publish("currencies", () => {
  return Restaurant.Collection.Currency.find();
});

Meteor.publish("existSales", () => {
  return Restaurant.Collection.Sales.find({
    status: 'unsaved'
  });
});
