Restaurant.Collection.Tables.permit(['insert', 'update', 'remove']).apply();
Restaurant.Collection.TableLocations.permit(['insert', 'update', 'remove']).apply();


Security.permit(['insert', 'update', 'remove']).collections([
    Restaurant.Collection.Categories,
    Restaurant.Collection.Units,
    Restaurant.Collection.Products,
    Images
]).apply();
