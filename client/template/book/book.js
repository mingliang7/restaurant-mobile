Template.newBook.onRendered(()=>{
    Session.setDefault('interestCategories', {});
});
Template.newBook.events({
    'click [name="category"]'(e){
        let getCurrentCategorySession = Session.get('interestCategories');
        let currentValue = e.currentTarget.value;
        if(e.currentTarget.checked){
            getCurrentCategorySession[currentValue] = currentValue;
            Session.set('interestCategories', getCurrentCategorySession);
        }else{
            delete getCurrentCategorySession[currentValue]
            Session.set('interestCategories', getCurrentCategorySession);
        }
    }
});


AutoForm.hooks({
    newBook:{
        onSuccess(formType, res){
            Bert.alert('Added!', 'success', 'fixed-top');
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'fixed-top');
        }
    }
});