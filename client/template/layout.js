Template.layout.helpers({

});

Template.layout.events({
    'click .sign-out'(){
        Meteor.logout();
        Bert.alert('Successfully logout', 'success', 'fixed-top')
    },
    'click .setting'(){
        
    }
});
