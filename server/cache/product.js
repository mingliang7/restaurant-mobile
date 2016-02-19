Restaurant.Collection.Products.cacheTimestamp();
//Restaurant.Collection.Products.cacheCount('saleDetailCount', Restaurant.Collection.SaleDetails, 'productId');
//Restaurant.Collection.Products.cacheCount('purchaseDetailCount', Restaurant.Collection.PurchaseDetails, 'productId');
//Restaurant.Collection.Products.cacheCount('adjustmentDetailCount', Restaurant.Collection.AdjustmentDetails, 'productId');
Restaurant.Collection.Products.cacheDoc('unit',Restaurant.Collection.Units,['name']);
Restaurant.Collection.Products.cacheDoc('category',Restaurant.Collection.Categories,['name']);