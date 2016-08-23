Restaurant.Collection.StockIn.before.insert(function(userId, doc) {
  doc.status = 'closed';
  doc._id = idGenerator.gen(Restaurant.Collection.StockIn, 6);
});

Restaurant.Collection.StockIn.after.insert((userId,doc)=>{
  Meteor.defer(function(){
    let formatDate = moment(doc.stockInDate).format('YYYY-MM-DD');
    let inventory = Restaurant.Collection.Inventory.findOne({
        date: moment(formatDate).toDate(),
        materialId: doc.materialId
    });
    if(inventory){
      updateInventory(inventory._id, doc);
    }else{
      insertInventory(doc);
    }
  });
});
Restaurant.Collection.StockIn.after.remove((userId,doc)=>{
  Meteor.defer(function(){
    let formatDate = moment(doc.stockInDate).format('YYYY-MM-DD');
    let inventory = Restaurant.Collection.Inventory.findOne({
        date: moment(formatDate).toDate(),
        materialId: doc.materialId
    });
    doc.qty = -doc.qty;
    updateInventory(inventory._id, doc);
  });
});
function updateInventory(inventoryId, selector) {
    Restaurant.Collection.Inventory.update(inventoryId, {
        $inc: {
            stockIn: selector.qty,
            balance: selector.qty,
        }
    });
    let currentInventory = Restaurant.Collection.Inventory.findOne(inventoryId);
    Restaurant.Collection.Materials.direct.update(currentInventory.materialId, {
        $set: {
            balance: currentInventory.balance
        }
    });
}

function insertInventory(selector) {
    let openingBalance = Restaurant.Collection.Materials.findOne(selector.materialId);
    let remainBalance = openingBalance.balance + selector.qty;
    let formatDate = moment(selector.stockInDate).format('YYYY-MM-DD');
    Restaurant.Collection.Inventory.insert({
        date: moment(formatDate).toDate(),
        openingBalance: openingBalance.balance,
        reduceQty: 0,
        stockIn: selector.qty,
        balance: remainBalance,
        materialId: selector.materialId,
        materialCategoryId: openingBalance.materialCategoryId
    });
    Restaurant.Collection.Materials.direct.update(openingBalance._id, {
        $set: {
            balance: remainBalance
        }
    });
}
