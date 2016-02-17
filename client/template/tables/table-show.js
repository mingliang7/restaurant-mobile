Template.tablesShow.created= function() {
    this.autorun(function () {
        this.subscription = Meteor.subscribe('table', Router.current().params._id);
    }.bind(this));
};
Template.tablesShow.render = function()
{
    this.autorun(function () {
        if (!this.subscription.ready()) {
            IonLoading.show();
        } else {
            IonLoading.hide();
        }
    }.bind(this));
};
Template.tablesShow.helpers({
    table(){
        debugger
        return Table.findOne({_id: Router.current().params.id});
    }
});