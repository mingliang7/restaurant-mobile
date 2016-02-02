Template.home.events({
    'click .btn-facebook': function () {
        Meteor.loginWithFacebook({requestPermissions: ['email']}, function (err) {
            //Do if conditional ...
        })
    }
});