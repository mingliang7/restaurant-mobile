Meteor.methods({
    getValidUser(id){
        return Meteor.users.findOne(id);
    },
    updateUserProfileInterest(id, doc){
        console.log(doc)
        Meteor.users.update(id, {
            $set: {
                'profile.interest.category': doc.profile.interest.category,
                'profile.tags': doc.profile.tags,
                'profile.interestPick': false
            }
        })
    },
    approvedUser(userId, approved){
      return Meteor.users.update({_id: userId}, {$set: {'profile.approved': !approved}})
    },
    updateUserRole(userId, roles){
      console.log(userId, roles)
      Meteor.users.update(userId, {$set: {roles: roles}});
    }
});
