Meteor.methods({
    getValidUser(id){
        return Meteor.users.findOne(id);
    }
});