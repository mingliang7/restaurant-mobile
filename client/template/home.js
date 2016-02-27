Template.home.render = function(){
  let invoiceId = Session.get('invoiceId');
  if (!_.isUndefined(invoiceId)) {
    Meteor.call('removeSaleIfNoSaleDetailExist', invoiceId);
    Session.set('invoiceId', undefined);
  }
}

Template.home.events({
    'click .btn-facebook': function () {
        Meteor.loginWithFacebook({requestPermissions: ['email']}, function (err) {
            //Do if conditional ...
        })
    }
});
