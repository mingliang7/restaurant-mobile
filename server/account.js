Accounts.onCreateUser((options, user)=> {
    console.log(user);
    user.profile = {
        tags: [],
        interest: {category: []},
        interestPick: true
    };
    if (user.services.facebook) {
        let fb = user.services.facebook;
        user.profile.username = `${fb.last_name} ${fb.first_name}`;
    }else{
        var splitEmail = user.emails[0].address.split('@');
        user.profile.username = `${splitEmail[0]}`
    }

    return user;

});