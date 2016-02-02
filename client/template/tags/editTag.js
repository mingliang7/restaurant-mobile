Template.editTag.helpers({
   tag(){
       return Reading.Collection.Tags.findOne(this.id);
   }
});


AutoForm.hooks({
    editTag:{
        onSuccess(formType, res){
            Bert.alert('Updated', 'success', 'fixed-top');
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'fixed-top');
        }
    }
});