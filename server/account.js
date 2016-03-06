Accounts.onCreateUser((options, user) => {
  console.log(user);
  if (_.isUndefined(user.profile)) {
    user.profile = {
      tags: [],
      interest: {
        category: []
      },
      interestPick: true,
    };
    if (user.username == 'super') {
      user.profile.approved = true
      user.profile.status = 'active'
    } else {
      user.profile.approved = false
      user.profile.status = 'active'
      user.roles = []
    }
  }
  if (user.services.facebook) {
    let fb = user.services.facebook;
    user.profile.username = `${fb.last_name} ${fb.first_name}`;
  } else {
    var splitEmail = user.emails[0].address.split('@');
    user.profile.username = `${splitEmail[0]}`
  }

  return user;

});
