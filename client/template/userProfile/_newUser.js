AutoForm.hooks({
    newUser: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            debugger;
            this.event.preventDefault();
            Meteor.call('insertNewUser', insertDoc, function (er, re) {
                if (er) {
                    Bert.alert(er.message, 'danger', 'growl-top-right');
                } else {
                    Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-top-right', 'fa-check');
                    IonModal.close();
                }
            });
            this.done();
        },
        onSuccess(formType, result) {
            Bert.alert('បង្កើតបានជោគជ័យ', 'success', 'growl-top-right', 'fa-check');
        },
        onError(formType, err) {
            Bert.alert(err.message, 'danger', 'growl-top-right');
        }
    }
});
