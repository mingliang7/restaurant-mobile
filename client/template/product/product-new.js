Template.productNew.rendered = function() {
  TmpItem.remove({});
}

Template.productNew.events({
  "click .ingradientName" (event, template) {
    IonModal.open('materialProduct');
  },
    "click .add-ingradient" (event) {
      let qty = $('.qty').val();
      let name = $('.ingradientName').val();
      if (name == '') {
        alertify.error('សូមបញ្ចូលឈ្មោះវត្ថុធាតុដើម');
      } else {
        let tmpItem = TmpItem.findOne($('.ingradientId').val());
        if(!tmpItem){
          TmpItem.insert({
            _id: $('.ingradientId').val(),
            name: name,
            qty: parseFloat(qty == '' ? 0 : qty)
          });
        }else{
          alertify.error('វត្ថុធាតុដើមមានរួចហើយ')
        }
        $('.ingradientName').val('');
        $('.ingradientId').val('');
        $('.qty').val('');
      }
  },
    "mouseleave .tmpQty" (event) {
      let qty = parseFloat(event.currentTarget.value);
      TmpItem.update(this._id, {
        $set: {
          qty: qty
        }
      });
  },
    "click .remove-ingradient-item" () {
      TmpItem.remove(this._id);
  },
    'click .save' (e) {
      let tmpItems = TmpItem.find();
      if (tmpItems.count() <= 0) {
        alertify.error('សូមបំពេញគ្រឿងផ្សំ');
        return false;
      }
  }
});
Template.productNew.helpers({
  tmpItems() {
    return TmpItem.find();
  }
});
Template.productNew.onDestroyed(()=>{
  TmpItem.remove({});
});
AutoForm.hooks({
  productNew: {
    before: {
      insert(doc) {
        let tmpItem = [];
        TmpItem.find().forEach(function(item) {
          tmpItem.push({
            productId: item._id,
            qty: item.qty
          });
        });
        doc.ingradient = tmpItem;
        return doc;
      }
    },
    onSuccess(formType, res) {
      TmpItem.remove({});
      Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-bottom-right');
      //IonModal.close();
    },
    onError(formType, err) {
      TmpItem.remove({});
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
