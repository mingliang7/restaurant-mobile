Template.stockEnabledEdit.helpers({
  stockEnabled() {
    var template = Template.instance();
    return Restaurant.Collection.StockEnabled.findOne({
      _id: `${template.data.id}`
    });
  }
});

AutoForm.hooks({
  stockEnabledEdit: {
    before: {
      update(doc){
        let stockEnabled = Restaurant.Collection.StockEnabled.findOne();
        console.log();
        if(doc.$set.enableReduceStock && (!stockEnabled.enabledDate || stockEnabled.enabledDate == '')){
          doc.$set.enabledDate = moment().toDate();
        }
        if(!doc.$set.enableReduceStock){
          doc.$set.enabledDate = '';
          doc.$set.autoReduceStock = false;
        }
        return doc;
      }
    },
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានជោគជ័យ', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
