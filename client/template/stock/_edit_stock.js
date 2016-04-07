Template.editStock.helpers({
  stock(){
    let id = Template.instance().data.id;
    let stock = Restaurant.Collection.Stocks.findOne(`${id}`);
    return stock;
  },
  suppliers(){
    return ReactiveMethod.call('getSupplierList');
  }
});

AutoForm.hooks({
  editStock:{
    onSuccess(formType, result){
      IonModal.close();
      alertify.success('កែប្រែបានជោគជ័យ');
    },
    onError(formType, err){
      alertify.error(err.message);
    }
  }
});
