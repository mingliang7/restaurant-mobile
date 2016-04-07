Template.restaurantStocksNew.events({
    "click [name='materialName']": function(event, template) {
        IonModal.open('_fetch_material');
    },
    "click .add-material" (event) {
        let qty = $('[name="qty"]').val();
        let name = $('[name="materialName"]').val();
        let type = $('.stock-type').val();
        if (name === '') {
            alertify.error('សូមបញ្ចូលឈ្មោះវត្ថុធាតុដើម');
        } else {
            let tmpItem = TmpItem.findOne({
                materialId: $('[name="materialId"]').val()
            });
            if (!tmpItem) {
                TmpItem.insert({
                    materialId: $('[name="materialId"]').val(),
                    name: name,
                    price: $('[name="price"]').val(),
                    qty: parseFloat(qty === '' ? 0 : qty),
                    type: type
                });
            } else {
                TmpItem.update({
                    materialId: tmpItem.materialId
                }, {
                    $set: {
                        qty: tmpItem.qty + parseFloat(qty === '' ? 0 : qty)
                    }
                });
            }
            $('[name="materialName"]').val('');
            $('[name="materialId"]').val('');
            $('[name="qty"]').val('');
            $('[name="price"]').val('');
        }
    }
});
Template._tmpMaterialItem.helpers({
    stockTypeIsOrder(type) {
        if (type == 'order') {
            return true;
        }
        return false;
    }
});
Template._tmpMaterialItem.events({
    "click .remove-material-item" () {
        TmpItem.remove(this._id);
    },
    "keyup .tmpQty" (event) {
        if (event.currentTarget.value !== '') {
            TmpItem.update(this._id, {
                $set: {
                    qty: parseFloat(event.currentTarget.value)
                }
            });
        } else {
            $('.tmpQty').val('0');
        }
    },
    "keypress .tmpQty" (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .tmpQty' (event) {
        event.currentTarget.select();
    },
    "keyup .tmpPrice" (event) {
        if (event.currentTarget.value !== '') {
            TmpItem.update(this._id, {
                $set: {
                    price: parseFloat(event.currentTarget.value)
                }
            });
        } else {
            $('.tmpPrice').val('0');
        }
    },
    "keypress .tmpPrice" (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        return !(charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'click .tmpPrice' (event) {
        event.currentTarget.select();
    },
    'change .stock-type' (event) {
        TmpItem.update(this._id, {
            $set: {
                type: event.currentTarget.value
            }
        });
    }
});
Template.restaurantStocksNew.helpers({
    tmpMaterialItems() {
      return TmpItem.find();
    },
    suppliers(){
      return ReactiveMethod.call('getSupplierList');
    }
});

Template.restaurantStocksNew.onDestroyed(function() {
    TmpItem.remove({});
});

AutoForm.hooks({
    addNewStock: {
        before: {
            insert(doc) {
              doc.stockDate = moment($('[name="stockDate"]').val(), 'YYYY-MM-DD HH:mm:ss').toDate();
              doc.tmpItems = TmpItem.find().fetch();
              return doc;
            }
        },
        onSuccess(formType, doc) {
            Router.go('restaurant.stocks');
            TmpItem.remove({});
            alertify.success('បង្កើតបានជោគជ័យ');
        }
    }
});
