Template.current_user.helpers({
    checkIf(currentUser){
        if(currentUser.profile.interestPick) Router.go(`/`);
    }
});
