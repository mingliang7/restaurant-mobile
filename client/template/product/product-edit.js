Template.editProduct.onCreated(function(){
    let product = Restaurant.Collection.Products.findOne({
        _id: this.data.id
    });
    this.scheme = new ReactiveVar(product.typeScheme);
});
Template.editProduct.helpers({
    product() {
            var template = Template.instance();
            let product = Restaurant.Collection.Products.findOne({
                _id: template.data.id
            });
            if (product.scheme) {
                product.scheme.forEach(function(s) {
                    Meteor.call('getProductBySchemeId', s.itemId, (
                        err, result) => {
                        s.name = result;
                        TmpScheme.insert(s);
                    });
                })
            }
            if (product.ingradient) {
                product.ingradient.forEach((ingradient) => {
                    Meteor.call('getMaterialName', ingradient.productId, (
                        err, result) => {
                        TmpItem.insert({
                            _id: ingradient.productId,
                            name: result,
                            qty: ingradient.qty
                        });
                    });
                });
            } else {
                product.ingradient = [{
                    productId: '',
                    qty: ''
                }];
            }
            console.log(product);
            return product;
        },
        tmpItems() {
            return TmpItem.find();
        },
        sumSchemePrice() {
            let totalPrice = 0;
            let tmpSchema = TmpScheme.find({});
            tmpSchema.forEach(function(o) {
                totalPrice += o.qty * o.price;
            });
            return totalPrice;
        },
        schemeItems() {
            console.log(TmpScheme.find().fetch())
            return TmpScheme.find()
        },
        scheme() {
            let instance = Template.instance()
            return instance.scheme.get()
        }
});
Template.editProduct.events({
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
            if (!tmpItem) {
                TmpItem.insert({
                    _id: $('.ingradientId').val(),
                    name: name,
                    qty: parseFloat(qty == '' ? 0 : qty)
                });
            } else {
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
	'click .remove-scheme' () {
		TmpScheme.remove(this._id)
	},
    'click .save' (e) {
        // let tmpItems = TmpItem.find();
        // if (tmpItems.count() <= 0) {
        //   alertify.error('សូមបំពេញគ្រឿងផ្សំ');
        //   return false;
        // }
    },
	'click .add-scheme'(e,instance){
		let typeScheme = $('[name="typeScheme"]').prop('checked');
		if(typeScheme){
			IonModal.open('fetchProductForScheme')
		}else{
			Bert.alert('សូមជ្រើសរើសយកប្រភេទឈុតជាមុនសិន!', 'danger', 'growl-bottom-right')
		}
	}
});
Template.editProduct.onDestroyed(() => {
    TmpItem.remove({});
    TmpScheme.remove({});
});
AutoForm.hooks({
    productEdit: {
        before: {
            update(doc) {
                let tmpItem = [];
                TmpItem.find().forEach(function(item) {
                    tmpItem.push({
                        productId: item._id,
                        qty: item.qty
                    });
                });
                doc.$set.ingradient = tmpItem;
                doc.$set.scheme = TmpScheme.find({}).fetch();
                delete doc.$unset;
                return doc;
            }
        },
        onSuccess(formType, result) {
            Bert.alert('កែប្រែបានជោគជ័យ', 'success',
                'growl-bottom-right');
            TmpItem.remove({});
            TmpScheme.remove({});
            IonModal.close();
        },
        onError(formType, err) {
            TmpItem.remove({});
            TmpScheme.remove({});
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
        }
    }
});
