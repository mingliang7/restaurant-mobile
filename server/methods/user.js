Meteor.methods({
    getValidUser(id){
        return Meteor.users.findOne(id);
    },
    updateUserProfileInterest(id, doc){
        console.log(doc);
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
        console.log(userId, roles);
        Meteor.users.update(userId, {$set: {roles: roles}});
    },
    insertNewUser: function (doc) {

        if (!Roles.userIsInRole(this.userId, ['super', 'setting'])) {
            throw new Meteor.Error("403", "Access denied");
        }
        var userObj = {
            profile: {
                username: doc.username,
                approved: doc.approved,
                status: 'active'
            },
            email: doc.email,
            password: doc.password,
            roles: doc.roles
        };
        var id = Accounts.createUser(userObj);
        if (doc.roles && doc.roles.length > 0) {
            Roles.addUsersToRoles(id, doc.roles);
        }
        return id;
    },
    updateUser: function (id, doc) {
        if (!Roles.userIsInRole(this.userId, ['super', 'admin'])) {
            throw new Meteor.Error("403", "Access denied");
        }
        Meteor.users.update(id, {
            $set: {
                email: doc.email,
                password: doc.password,
                roles: doc.roles
            }
        });
        if (doc.roles && doc.roles.length > 0) {
            Roles.addUsersToRoles(id, doc.roles);
        }
        return true;
    }


});
