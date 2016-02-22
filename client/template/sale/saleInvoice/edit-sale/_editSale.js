

Template._editSale.helpers({
  sale() {
    let saleId = Template.instance().data.id;
    return Restaurant.Collection.Sales.findOne(`${saleId}`);
  }
});

AutoForm.hooks({
  editSale: {
    before:{
      update(doc){
        if(doc.$set){
          let currentTime = moment().format('HH:mm:ss');
          let currentDate = moment(doc.$set.saleDate).format('YYYY MM DD');
          doc.$set.saleDate = moment(`${currentDate} ${currentTime}`).toDate();
        }
        debugger
        return doc;
      }
    },
    onSuccess(formType, result) {
      Bert.alert('Updated', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
