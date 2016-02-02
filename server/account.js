Accounts.onCreateUser((options, user)=> {
        console.log(user);
        user.profile = {
            tags: [],
            interest: {category: []},
            interestPick: true
        };
        return user;

});