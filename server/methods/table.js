Meteor.methods({
  removeTable: function(id) {
    Restaurant.Collection.Tables.remove(id);
  },
  getTablesByLocation(id){
    let list = [];
    let tables = Restaurant.Collection.Tables.find({tableLocationId: id}, {sort: {name: 1}});
    if(tables.count() > 0){
      tables.forEach((table)=>{
        list.push({label: `${table.name} (${table._tableLocation.name})`, value: table._id});
      })
    }
    return list;
  },
  getInvoicesByTable(tableId){
    console.log(tableId)
    if(tableId){
      let sales = Restaurant.Collection.Sales.find({tableId: tableId, status: 'active'});
      return sales.fetch();
    }
    return [];
  }
});
