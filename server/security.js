Security.permit(['insert', 'update', 'remove']).collections([
    Restaurant.Collection.Categories,
    Restaurant.Collection.Units,
    Restaurant.Collection.Products,
    Restaurant.Collection.Customers,
    Restaurant.Collection.Notes,
    Restaurant.Collection.Staffs,
    Restaurant.Collection.Tables,
    Restaurant.Collection.TableLocations,
    Images
]).apply();
