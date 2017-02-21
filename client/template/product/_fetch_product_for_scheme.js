Template.fetchProductForScheme.onCreated(function() {
    this.query = new ReactiveVar();
    this.result = new ReactiveVar([]);
    Meteor.call('fetchProductForScheme', this.query.get(), (err, result) => {
        if (!err) {
            this.result.set(result);
        }
    });
    this.autorun(() => {
        let query = this.query.get();
        if (query) {
            Meteor.call('fetchProductForScheme', this.query.get(), (
                err, result) => {
                if (!err) {
                    this.result.set(result);
                }
            })
        }
    });
});
Template.fetchProductForScheme.events({
    'keyup [name="searchProductForScheme"]': _.debounce(function(event,
        instance) {
        instance.query.set(event.currentTarget.value);
    }, 200)
});

Template.fetchProductForScheme.helpers({
    schemeItems: function() {
        let instance = Template.instance();
        return instance.result.get();
    }
});
Template.productScheme.events({
    'change .add-qty-scheme' (event, template) {
        let checked = $(event.currentTarget).prop('checked');
        let qty = $(event.currentTarget).parents('.product-scheme').find(
            '.qty-scheme').val();
        this.itemId = this._id;
        this.qty = parseFloat(qty);
        if (checked) {
            let tmpItem = TmpScheme.findOne({itemId: this.itemId});
            if(!tmpItem){
                TmpScheme.insert(this);
            }
        } else {
            TmpScheme.remove({
                itemId: this.itemId
            });
        }
    },
    'keyup .qty-scheme': _.debounce(function(event, instance) {
        let val = $(event.currentTarget).val();
        if ( val == '0') {
            $(event.currentTarget).val(1);
        } else {
            $(event.currentTarget).parents('.product-schema').find('.add-qty-scheme').prop('checked', true);
            this.itemId = this._id;
            this.qty = parseFloat(val);
            let tmpScheme = TmpScheme.findOne({
                itemId: this.itemId
            });
            if (tmpScheme) {
                TmpScheme.update(tmpScheme._id, {
                    $set: {
                        qty: this.qty
                    }
                })
            } else {
                TmpScheme.insert(this);
            }
        }

    }, 200)
});
