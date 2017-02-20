Template.productNew.onCreated(function() {
	this.scheme = new ReactiveVar(false);
})
Template.productNew.rendered = function() {
	TmpItem.remove({})
	TmpScheme.remove({})
}
Template.productNew.events({
	"change [name='typeScheme']" (event, instance) {
		let checked = $(event.currentTarget).prop('checked')
		if (checked) {
			instance.scheme.set(true)
		} else {
			instance.scheme.set(false)
		}
	},
	'click .ingradientName' (event, template) {
		IonModal.open('materialProduct')
	},
	'click .add-ingradient' (event) {
		let qty = $('.qty').val()
		let name = $('.ingradientName').val()
		if (name == '') {
			alertify.error('សូមបញ្ចូលឈ្មោះវត្ថុធាតុដើម')
		} else {
			let tmpItem = TmpItem.findOne($('.ingradientId').val())
			if (!tmpItem) {
				TmpItem.insert({
					_id: $('.ingradientId').val(),
					name: name,
					qty: parseFloat(qty == '' ? 0 : qty)
				})
			} else {
				alertify.error('វត្ថុធាតុដើមមានរួចហើយ')
			}
			$('.ingradientName').val('')
			$('.ingradientId').val('')
			$('.qty').val('')
		}
	},
	'mouseleave .tmpQty' (event) {
		let qty = parseFloat(event.currentTarget.value)
		TmpItem.update(this._id, {
			$set: {
				qty: qty
			}
		})
	},
	'click .remove-ingradient-item' () {
		TmpItem.remove(this._id)
	},
	'click .remove-scheme' () {
		TmpScheme.remove(this._id)
	},
	'click .save' (e) {
		// let tmpItems = TmpItem.find()
		// if (tmpItems.count() <= 0) {
		//   alertify.error('សូមបំពេញគ្រឿងផ្សំ')
		//   return false
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
})
Template.productNew.helpers({
		sumSchemePrice(){
			let totalPrice = 0;
			let tmpSchema = TmpScheme.find({});
			tmpSchema.forEach(function(o){
					totalPrice += o.qty * o.price;
			});
			return totalPrice;
		},
		tmpItems() {
			return TmpItem.find()
		},
		schemeItems() {
			return TmpScheme.find()
		},
		scheme() {
			let instance = Template.instance()
			return instance.scheme.get()
		}
})
Template.productNew.onDestroyed(() => {
	TmpItem.remove({});
	TmpScheme.remove({});
})
AutoForm.hooks({
	productNew: {
		before: {
			insert(doc) {
				let tmpItem = []
				TmpItem.find().forEach(function(item) {
					tmpItem.push({
						productId: item._id,
						qty: item.qty
					})
				})
				doc.scheme = TmpScheme.find({}).fetch();
				doc.ingradient = tmpItem
				return doc
			}
		},
		onSuccess(formType, res) {
			TmpItem.remove({})
			TmpScheme.remove({});
			debugger
			Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-bottom-right')
				// IonModal.close()
		},
		onError(formType, err) {
			TmpItem.remove({});
			TmpScheme.remove({});
			Bert.alert(err.message, 'danger', 'growl-bottom-right')
		}
	}
})
