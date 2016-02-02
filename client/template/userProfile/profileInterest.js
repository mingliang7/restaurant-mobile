Template.profileInterest.onRendered(()=> {
    debugger
    Meteor.call('getValidUser', Router.current().params.id, function (err, result) {
        if(err){
            console.log(err);
        }else{
            if(_.isUndefined(result)) {
                Router.go('/');
            }
        }
    });
});