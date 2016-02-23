

Template._editSale.helpers({
  sale() {
    let saleId = Template.instance().data.id;
    return Restaurant.Collection.Sales.findOne(`${saleId}`);
  }
});
Template._editDiscount.helpers({
  sale() {
    let saleId = Template.instance().data.id;
    return Restaurant.Collection.Sales.findOne(`${saleId}`);
  }
});
Template._editDiscount.events({
  "keyup [name='discount']"(event, template) {
    let discount = $('[name="discount"]').val();
    let currentSubTotal = parseFloat($('[name="subTotal"]').val());
    if(discount != '' ){
      if(parseFloat(discount) < 0 || parseFloat(discount) > 100){
        $('[name="discount"]').val('0');
      }else{
        $("[name='total']").val(parseFloat(currentSubTotal) * (1 - parseFloat(discount)/100));
      }
    }
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
      Bert.alert('កែប្រែបានសម្រេច', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  },
  editDiscount:{
    onSuccess(formType, result) {
      Bert.alert('កែប្រែបានសម្រេច', 'success', 'growl-bottom-right');
      IonModal.close();
    },
    onError(formType, err) {
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
