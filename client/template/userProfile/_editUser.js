Template.editUser.helpers({
    user(){
        let template = Template.instance();
        return Meteor.users.findOne(template.data.id);
    }
});


AutoForm.hooks({
    editUser:{
        onSubmit: function (doc) {
            debugger;
            this.event.preventDefault();
            Meteor.call('updateUser', doc, function (er, re) {
                if (er) {
                    Bert.alert(er.message, 'danger', 'growl-top-right');
                } else {
                    Bert.alert('កែប្រែបានជោគជ័យ', 'success', 'growl-top-right', 'fa-check');
                    IonModal.close();
                }
            });
            this.done();
        },
        onSuccess(formType, result){
            Bert.alert('កែប្រែបានជោគជ័យ!', 'success', 'growl-top-right', 'fa-check');
            IonModal.close();
        },
        onError(formType, err){
            Bert.alert(err.message, 'danger', 'growl-top-right');
        }
    }
});
