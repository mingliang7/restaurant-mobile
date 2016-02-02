Template.bookCategories.created = function () {
    this.autorun(()=> {
        this.subscription = Meteor.subscribe('categories');
    })
};

Template.bookCategories.rendered = function () {
    this.autorun(() => {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    });
};

Template.bookCategories.helpers({
    categories(){
        return Categories.find();
    },
    getCategoryPath(){
        let tableId = Router.current().params.id;
        let categoryId = this._id;
        return `/categories/${categoryId}`;
    }
});
Template.bookCategories.events({
    'click [data-action="confirm"]': function (event, template) {
        debugger
        IonPopup.confirm({
            title: 'Are you sure?',
            template: `Detele ${this.name}?`,
            onOk: () => {
                Meteor.call('removeCategory', this._id);
            },
            onCancel: function () {
                console.log('Cancelled');
            }
        });
    }
});
Template.editCategory.helpers({
    category(){
        debugger
        return Categories.findOne(this.id);
    }
});

AutoForm.hooks({
    categoryNew: {
        onSuccess(formType, result){
            Bert.alert('Added', 'success', 'growl-bottom-right');
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
        }
    },
    editCategory: {
        onSuccess(formType, doc){
            Bert.alert('Updated', 'success', 'fixed-top');
        },
        onError(formType, err){
            Bert.alert(err.message, 'success', 'fixed-top');
        }
    }
});