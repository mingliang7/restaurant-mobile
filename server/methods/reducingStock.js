Meteor.methods({
    reducingStock({
        data
    }) {
        let saleId;
        data.forEach(function(sale) {
            saleId = sale.saleId;
            sale.materials.forEach(function(material) {
                let formatDate = moment(material.date).format('YYYY-MM-DD');
                let inventory = Restaurant.Collection.Inventory.findOne({
                    date: moment(formatDate).toDate(),
                    materialId: material.data.productId
                });
                console.log(inventory);
                if (inventory) {
                    updateInventory({
                        inventoryId: inventory._id,
                        material,
                        saleId
                    });
                } else {
                    insertInventory({
                        saleId,
                        material
                    });
                }
            });
        });
        return saleId;
    }
});


function insertInventory({
    saleId,
    material
}) {
    let openingBalance = Restaurant.Collection.Materials.findOne(material.data.productId);
    let remainBalance = openingBalance.balance - material.data.totalQty;
    let formatDate = moment(material.date).format('YYYY-MM-DD');
    Restaurant.Collection.Inventory.insert({
        date: moment(formatDate).toDate(),
        openingBalance: openingBalance.balance,
        reduceQty: material.data.totalQty,
        stockIn: 0,
        balance: remainBalance,
        materialId: material.data.productId,
        materialCategoryId: openingBalance.materialCategoryId
    });
    Restaurant.Collection.Materials.direct.update(openingBalance._id, {
        $set: {
            balance: remainBalance
        }
    });
    Restaurant.Collection.Sales.direct.update(saleId, {
        $set: {
            "eop.status": true
        }
    });
}


function updateInventory({
    inventoryId,
    material,
    saleId
}) {
    Restaurant.Collection.Inventory.update(inventoryId, {
        $inc: {
            reduceQty: material.data.totalQty,
            balance: -material.data.totalQty,
        }
    });
    let currentInventory = Restaurant.Collection.Inventory.findOne(inventoryId);
    Restaurant.Collection.Materials.direct.update(currentInventory.materialId, {
        $set: {
            balance: currentInventory.balance
        }
    });
    Restaurant.Collection.Sales.direct.update(saleId, {
        $set: {
            "eop.status": true
        }
    });
}
