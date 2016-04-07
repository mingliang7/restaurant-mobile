Meteor.methods({
  getSupplierList(){
    let list = [];
    let suppliers = Restaurant.Collection.Suppliers.find();
    if(suppliers.count() > 0){
      suppliers.forEach((supplier)=>{
        list.push({label: `${supplier._id} | ${supplier.name}`,value: supplier._id});
      });
    }
    return list;
  }
});
