Template.editStockIn.events({
  "click [name='materialName']": function(event, template){
    IonModal.open('_fetch_material');
  }
});
Template.editStockIn.helpers({
  stockIn(){
    let id = Template.instance().data.id;
    return Restaurant.Collection.StockIn.findOne(`${id}`);
  }
});
AutoForm.hooks({
  editStockIn: {
    before: {
      update(doc){
        doc.stockInDate = moment(Router.current().params.stockDate, 'YYYY-MM-DD HH:mm:ss').toDate();
        return doc;
      }
    },
    onSuccess(formType, result) {
      IonModal.close();
      Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-top-right', 'fa-check');
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-top-right');
    }
  }
});
