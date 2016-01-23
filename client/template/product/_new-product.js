Template.newProduct.helpers({
    categoryId(){
        return Router.current().params.categoryId;
    }
});

AutoForm.hooks({
    newProduct: {
        onSuccess(formType, result){
            Bert.alert('Added', 'success', 'growl-bottom-right');
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'growl-bottom-right');
        }
    }
});