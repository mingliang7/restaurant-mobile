Template.profileInterest.onRendered(()=> {
    Session.setDefault('interestCategories', {});
    if(Meteor.userId() != Router.current().params.id){
        Router.go("/");
    }
});

Template.profileInterest.events({
    'click [name="profile.interest.category"]'(e){
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
    interestUpdate:{
        onSubmit(currentDoc, insertDoc, updateDoc){
            this.event.preventDefault();
            Meteor.call('updateUserProfileInterest', Meteor.userId(), currentDoc, (err, res) => {
                if(err){
                    console.log(err);
                }else{
                    Bert.alert('Updated', 'success', 'fixed-top');
                    Router.go('/');
                }
            });

        },
        onSuccess(formType, result){
            Bert.alert('Updated', 'success', 'fixed-top');
            Router.go('/');
        }
    }
});