Template.product.created = function () {
    this.limitAmount = new ReactiveVar(10);
    this.skipAmount = new ReactiveVar(0);
    this.autorun(function () {
        this.subscription = Meteor.subscribe('products', this.limitAmount.get(), this.skipAmount.get());
        this.subscription = Meteor.subscribe("productCount");
    }.bind(this));
};
Template.product.rendered = function () {
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};

Template.product.helpers({
    products() {
        var products = Restaurant.Collection.Products.find({}, {sort: {name: 1}});
        return products;
    },
    join(tags){
        return tags.join(' ');
    },
    checkIfSkipZero(){
        let instance = Template.instance();
        return instance.skipAmount.get() == 0;
    }
});

Template.product.events({
    'change .limitAmountSelect'(event,instance){
        instance.limitAmount.set(parseFloat(event.currentTarget.value))
    },
    'click .remove-product' (event, template) {
        let name = this.name;
        IonPopup.confirm({
            title: 'តើលោកអ្នកត្រូវការលុបឬ ?',
            template: `លុប ${name} ?`,
            onOk: () => {
                Meteor.call('productIsEmpty', this._id, (err, result)=> {
                    if (err) {
                        console.log(err);
                    }
                    if (result) {
                        removeProduct(name, this._id);
                    } else {
                        alertify.warning(`មិនអាចលុបបានទេ ${name} ត្រូវបានកំពុងយកទៅប្រើប្រាស់`);
                    }
                });
            },
            onCancel: function () {
                Bert.alert('មិនយល់ព្រមក្នុងការលុប !', 'info', 'growl-bottom-right', 'fa-info')
            }
        });
    },
    'click .next'(event,instance){
        let limitAmount = instance.limitAmount.get();
        let skipAmount = instance.skipAmount.get();
        instance.skipAmount.set(limitAmount + skipAmount);
    },
    'click .previous'(event,instance){
        let limitAmount = instance.limitAmount.get();
        let skipAmount = instance.skipAmount.get();
        let calSkip = skipAmount - limitAmount  ;
        if( calSkip <= 0 ){
            instance.skipAmount.set(0);
        }else{
            instance.skipAmount.set(calSkip);
        }
    }
});
Template.product.onDestroyed(function(){
    Session.set('subProductImages', undefined);
});
let removeProduct = (name, id)=> {
    Meteor.call('removeProduct', id, function (err, result) {
        if (err) {
            Bert.alert(`Can't Removed ${name}`, 'danger', 'growl-bottom-right', 'fa-remove');
        } else {
            Bert.alert(`លុប ${name}​ បានជោគជ័យ !`, 'success', 'growl-bottom-right', 'fa-check');
        }
    });
};
