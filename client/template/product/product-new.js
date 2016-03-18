Template.productNew.rendered = function() {
  Session.set('stockValue', false);
  TmpItem.remove({});
}

Template.productNew.events({
  "change [name='stockType']": function(event, template) {
    let currentVal = event.currentTarget.value;
    $('.ingradientName').val('');
    $('.ingradientId').val('');
    if (currentVal == 'Stock') {
      Session.set('stockValue', false);
      TmpItem.remove({});
    } else {
      Session.set('stockValue', true)
    }
  },
  "click .ingradientName" (event, template) {
    IonModal.open('materialProduct');
  },
  "click .add-ingradient" (event) {
    let qty = $('.qty').val();
    let name = $('.ingradientName').val();
    if (name == '') {
      alertify.error('សូមបញ្ចូលឈ្មោះវត្ថុធាតុដើម');
    } else {
      TmpItem.insert({
        _id: $('.ingradientId').val(),
        name: name,
        qty: parseFloat(qty)
      });
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
    if ($('[name="stockType"]').val() == 'NonStock' && tmpItems.count() <= 0) {
      alertify.error('សូមបំពេញគ្រឿងផ្សំ');
      return false;
    }
  }
});
Template.productNew.helpers({
  isNotStockValue() {
    return Session.get('stockValue');
  },
  tmpItems() {
    return TmpItem.find();
  }
});
AutoForm.hooks({
  productNew: {
    before:{
      insert(doc){
          let tmpItem = [];
          TmpItem.find().forEach(function(item) {
            tmpItem.push({productId: item._id, qty: item.qty});
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
      Bert.alert(err.message, 'danger', 'growl-bottom-right');
    }
  }
});
